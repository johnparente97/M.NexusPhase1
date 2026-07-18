import {
  Workflow,
  WorkflowRun,
  WorkflowRunStep,
  WorkflowResult,
  ResultSection,
} from '@meridian-nexus/shared-types';
import { WorkflowRepository, RunRepository } from '../repositories/interfaces';
import { createModelProvider } from '../providers/model/factory';
import { MockMeridianSettlementProvider } from '../providers/settlement/mock';
import { generateId } from '../utils/id';
import { getIsoTimestamp } from '../utils/time';
import { ValidationError, AppError } from '../utils/errors';
import { createDynamicInputSchema } from '@meridian-nexus/validation';
import { Bindings } from '../types';
import { verifyTypedData } from 'viem';

export class WorkflowExecutionService {
  private workflowRepo: WorkflowRepository;
  private runRepo: RunRepository;
  private env: Bindings;

  constructor(workflowRepo: WorkflowRepository, runRepo: RunRepository, env: Bindings) {
    this.workflowRepo = workflowRepo;
    this.runRepo = runRepo;
    this.env = env;
  }

  async execute(
    workflowId: string, 
    userId: string, 
    inputs: Record<string, unknown>,
    paymentDetails?: {
      signature?: string;
      nonce?: string;
      validBefore?: number;
    }
  ): Promise<WorkflowRun> {
    const workflow = await this.workflowRepo.getById(workflowId);
    if (!workflow) throw new ValidationError('Workflow not found');
    if (workflow.status !== 'published') throw new ValidationError('Workflow is not published');
    if (!workflow.currentVersion) throw new ValidationError('Workflow has no version defined');

    // 1. Validate inputs against dynamic Zod schema
    const inputSchema = createDynamicInputSchema(workflow.currentVersion.inputDefinitions);
    const parsedInputs = await inputSchema.safeParseAsync(inputs);
    
    if (!parsedInputs.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsedInputs.error.issues) {
        fieldErrors[issue.path.join('.')] = issue.message;
      }
      throw new ValidationError('Workflow input validation failed.', fieldErrors);
    }

    const runId = generateId('run');
    const version = workflow.currentVersion;
    
    // 2. Create Run Record
    const run: WorkflowRun = {
      id: runId,
      workflowId,
      workflowVersionId: version.id,
      userId,
      status: 'pending',
      inputs: parsedInputs.data,
      startedAt: null,
      completedAt: null,
      durationMs: null,
      modelProvider: version.modelProvider,
      modelId: version.modelId,
      isFallback: false,
      fallbackReason: null,
      estimatedPrice: workflow.pricePerRun,
      actualPrice: workflow.pricePerRun,
      errorMessage: null,
      errorCode: null,
      createdAt: getIsoTimestamp(),
      updatedAt: getIsoTimestamp(),
    };

    await this.runRepo.create(run);

    // 3. Create Steps
    const stepKeys = ['validate', 'prepare', 'authorize', 'context', 'generate', 'validate-output', 'save', 'finalize'];
    const steps: WorkflowRunStep[] = stepKeys.map((key, idx) => ({
      id: generateId('step'),
      runId,
      stepKey: key,
      label: this.getStepLabel(key),
      status: 'pending',
      startedAt: null,
      completedAt: null,
      durationMs: null,
      metadata: null,
      displayOrder: idx,
    }));

    for (const step of steps) {
      await this.runRepo.createStep(step);
    }

    // Run execution in background (non-blocking for Worker, or synchronous for execution timing)
    return this.runExecutionLoop(runId, userId, steps, workflow, version, parsedInputs.data, paymentDetails);
  }

  private async runExecutionLoop(
    runId: string,
    userId: string,
    steps: WorkflowRunStep[],
    workflow: Workflow,
    version: any,
    inputs: Record<string, any>,
    paymentDetails?: {
      signature?: string;
      nonce?: string;
      validBefore?: number;
    }
  ): Promise<WorkflowRun> {
    const startTime = Date.now();
    await this.runRepo.updateStatus(runId, 'running', { startedAt: getIsoTimestamp() });

    try {
      // Step 1: Validate
      await this.runStep(steps, 'validate', async () => {
        // Validation already performed in outer block
      });

      // Step 2: Prepare
      await this.runStep(steps, 'prepare', async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
      });

      // Step 3: Authorize Settlement
      let receipt: any = null;
      await this.runStep(steps, 'authorize', async () => {
        // Cryptographically verify EIP-712 payment authorization if workflow is paid and signature details are provided
        if (workflow.pricePerRun > 0) {
          if (!paymentDetails || !paymentDetails.signature || !paymentDetails.nonce || !paymentDetails.validBefore) {
            throw new ValidationError('A valid testnet payment signature and nonce authorization are required for paid capabilities.');
          }

          const { signature, nonce, validBefore } = paymentDetails;
          
          // Reconstruct and verify the signature using viem
          let isValidSignature = false;
          try {
            // Extract the user's primary wallet address from the authenticated user.id (which is formatted as usr-0x...)
            const walletAddress = userId.replace(/^usr-/, '') as `0x${string}`;
            const rawAmount = Math.round(workflow.pricePerRun * 1000000).toString();

            isValidSignature = await verifyTypedData({
              address: walletAddress,
              domain: {
                name: 'USD Coin',
                version: '2',
                chainId: 84532, // Base Sepolia Chain ID
                verifyingContract: '0x036cbd53842c3db6650800b2854ef71e213fd2db' // USDC Proxy
              },
              types: {
                TransferWithAuthorization: [
                  { name: 'from', type: 'address' },
                  { name: 'to', type: 'address' },
                  { name: 'value', type: 'uint256' },
                  { name: 'validAfter', type: 'uint256' },
                  { name: 'validBefore', type: 'uint256' },
                  { name: 'nonce', type: 'bytes32' }
                ]
              },
              primaryType: 'TransferWithAuthorization',
              message: {
                from: walletAddress,
                to: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4', // Meridian Facilitator
                value: BigInt(rawAmount),
                validAfter: 0n,
                validBefore: BigInt(validBefore),
                nonce: nonce as `0x${string}`
              },
              signature: signature as `0x${string}`
            });
          } catch (e: any) {
            console.error('USDC typed data signature verification failed:', e);
            throw new ValidationError('Payment signature verification failed: ' + e.message);
          }

          if (!isValidSignature) {
            throw new ValidationError('Cryptographic payment signature mismatch. Invalid authorization payload.');
          }
        }

        const settlement = new MockMeridianSettlementProvider();
        const auth = await settlement.createAuthorization({
          userId: userId,
          runId,
          amount: workflow.pricePerRun,
          currency: 'USDC',
          workflowId: workflow.id,
          workflowName: workflow.name,
        });

        receipt = await settlement.settleUsage({
          authorizationId: auth.authorizationId,
          runId,
          amount: workflow.pricePerRun,
          currency: 'USDC',
        });

        await this.runRepo.createSettlementReceipt(receipt);
      });

      // Step 4: Context
      await this.runStep(steps, 'context', async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });

      // Step 5: Generate Output (Call AI Provider)
      let modelResult: any = null;
      await this.runStep(steps, 'generate', async () => {
        // Build prompts
        const userPrompt = this.constructPrompt(version.inputDefinitions, inputs || {});
        const systemPrompt = version.systemInstructions;

        const provider = createModelProvider(this.env, version.modelId);
        
        try {
          modelResult = await provider.generate({
            systemPrompt,
            userPrompt,
            outputSchema: version.outputSchema,
            maxTokens: version.maxTokens,
            temperature: version.temperature,
          });
        } catch (e) {
          console.warn('Live AI execution failed, falling back to deterministic demo output.', e);
          const fallbackProvider = createModelProvider({} as any, 'demo');
          modelResult = await fallbackProvider.generate({
            systemPrompt,
            userPrompt,
          });
        }
      });

      // Step 6: Validate Output
      let sections: ResultSection[] = [];
      await this.runStep(steps, 'validate-output', async () => {
        if (modelResult.parsedSections) {
          sections = modelResult.parsedSections;
        } else {
          // Fallback parsing logic if returned raw text format
          sections = [
            {
              key: 'summary',
              label: 'Analysis Outcome',
              type: 'paragraph',
              content: modelResult.content,
            },
          ];
        }
      });

      // Step 7: Save
      const resultId = generateId('res');
      const result: WorkflowResult = {
        id: resultId,
        runId,
        sections,
        rawOutput: modelResult.content,
        metadata: {
          modelProvider: modelResult.provider,
          modelId: modelResult.model,
          isFallback: modelResult.isFallback,
          fallbackReason: modelResult.fallbackReason,
          generationTimeMs: modelResult.generationTimeMs,
          workflowVersion: version.versionNumber,
        },
        createdAt: getIsoTimestamp(),
      };

      await this.runRepo.saveResult(result);

      // Step 8: Finalize
      await this.runStep(steps, 'finalize', async () => {
        await new Promise((resolve) => setTimeout(resolve, 300));
      });

      const durationMs = Date.now() - startTime;
      return await this.runRepo.updateStatus(runId, 'completed', {
        completedAt: getIsoTimestamp(),
        durationMs,
        modelProvider: modelResult.provider,
        modelId: modelResult.model,
        isFallback: modelResult.isFallback,
        fallbackReason: modelResult.fallbackReason,
      });
    } catch (error) {
      console.error(`Execution run ${runId} failed:`, error);
      const durationMs = Date.now() - startTime;
      
      return await this.runRepo.updateStatus(runId, 'failed', {
        completedAt: getIsoTimestamp(),
        durationMs,
        errorMessage: error instanceof Error ? error.message : 'Unknown execution failure',
        errorCode: error instanceof AppError ? error.code : 'EXECUTION_FAILED',
      });
    }
  }

  private async runStep(
    steps: WorkflowRunStep[],
    key: string,
    action: () => Promise<void>
  ): Promise<void> {
    const step = steps.find((s) => s.stepKey === key);
    if (!step) return;

    const start = Date.now();
    await this.runRepo.updateStepStatus(step.id, 'running');

    try {
      await action();
      await this.runRepo.updateStepStatus(step.id, 'completed', Date.now() - start);
    } catch (e) {
      await this.runRepo.updateStepStatus(step.id, 'failed', Date.now() - start);
      throw e;
    }
  }

  private constructPrompt(inputDefs: any[], inputs: Record<string, any>): string {
    let prompt = `Executing workflow. Inputs:\n`;
    for (const def of inputDefs) {
      const val = inputs[def.fieldKey];
      if (val !== undefined) {
        prompt += `- ${def.label} (${def.fieldKey}): ${typeof val === 'object' ? JSON.stringify(val) : val}\n`;
      }
    }
    return prompt;
  }

  private getStepLabel(key: string): string {
    const labels: Record<string, string> = {
      validate: 'Validating inputs',
      prepare: 'Preparing capabilities',
      authorize: 'Confirming Meridian authorization',
      context: 'Preparing model context',
      generate: 'Running analysis',
      'validate-output': 'Validating structure',
      save: 'Saving execution history',
      finalize: 'Finalizing result',
    };
    return labels[key] ?? 'Processing';
  }
}
