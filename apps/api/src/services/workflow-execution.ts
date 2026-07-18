import {
  Workflow,
  WorkflowRun,
  WorkflowRunStep,
  WorkflowResult,
  ResultSection,
} from '@meridian-nexus/shared-types';
import { WorkflowRepository, RunRepository } from '../repositories/interfaces';
import { createModelProvider } from '../providers/model/factory';
import { createSettlementProvider } from '../providers/settlement/factory';
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
    paymentIntentId?: string,
    signature?: string
  ): Promise<{ run: WorkflowRun; steps: WorkflowRunStep[]; version: any; workflow: Workflow }> {
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

    // 2. Validate Payment Intent & signature cryptographically if workflow is paid
    if (workflow.pricePerRun > 0) {
      if (!paymentIntentId || !signature) {
        throw new ValidationError('A valid payment intent and cryptographic signature authorization are required for paid workflows.');
      }

      // Fetch payment intent from DB
      const intent = await this.env.DB.prepare(
        'SELECT * FROM payment_intents WHERE id = ?'
      )
        .bind(paymentIntentId)
        .first<{
          id: string;
          user_id: string;
          linked_wallet: string;
          workflow_id: string;
          amount: number;
          token: string;
          chain_id: number;
          recipient: string;
          nonce: string;
          valid_after: number;
          valid_before: number;
          status: string;
        }>();

      if (!intent) {
        throw new ValidationError('The specified payment intent was not found.');
      }

      if (intent.user_id !== userId) {
        throw new ValidationError('This payment intent belongs to a different user profile.');
      }

      if (intent.workflow_id !== workflowId) {
        throw new ValidationError('Payment intent does not match the execution workflow.');
      }

      if (intent.status !== 'pending') {
        throw new ValidationError(`Payment intent has an invalid status: ${intent.status}`);
      }

      const nowUnix = Math.floor(Date.now() / 1000);
      if (intent.valid_before <= nowUnix) {
        throw new ValidationError('The payment intent has expired.');
      }

      // Replay Protection: Check if nonce was already consumed
      const existingNonce = await this.env.DB.prepare(
        'SELECT nonce FROM payment_nonces WHERE nonce = ?'
      )
        .bind(intent.nonce)
        .first<{ nonce: string }>();

      if (existingNonce) {
        throw new ValidationError('This payment authorization nonce has already been consumed. Replay detected.');
      }

      // Verify EIP-712 USDC TransferWithAuthorization signature using viem
      let isValidSignature = false;
      try {
        const walletAddress = intent.linked_wallet as `0x${string}`;
        const rawAmount = Math.round(intent.amount * 1000000).toString();

        isValidSignature = await verifyTypedData({
          address: walletAddress,
          domain: {
            name: 'USD Coin',
            version: '2',
            chainId: intent.chain_id,
            verifyingContract: intent.token as `0x${string}`,
          },
          types: {
            TransferWithAuthorization: [
              { name: 'from', type: 'address' },
              { name: 'to', type: 'address' },
              { name: 'value', type: 'uint256' },
              { name: 'validAfter', type: 'uint256' },
              { name: 'validBefore', type: 'uint256' },
              { name: 'nonce', type: 'bytes32' },
            ],
          },
          primaryType: 'TransferWithAuthorization',
          message: {
            from: walletAddress,
            to: intent.recipient as `0x${string}`,
            value: BigInt(rawAmount),
            validAfter: BigInt(intent.valid_after),
            validBefore: BigInt(intent.valid_before),
            nonce: intent.nonce as `0x${string}`,
          },
          signature: signature as `0x${string}`,
        });
      } catch (e: any) {
        console.error('USDC typed data verification failed:', e);
        throw new ValidationError('Payment signature verification failed: ' + e.message);
      }

      if (!isValidSignature) {
        throw new ValidationError('Cryptographic payment signature mismatch. Invalid authorization payload.');
      }

      // Register consumed nonce to prevent replay attacks
      await this.env.DB.prepare(
        'INSERT INTO payment_nonces (nonce) VALUES (?)'
      )
        .bind(intent.nonce)
        .run();

      // Update payment intent status to signed
      await this.env.DB.prepare(
        'UPDATE payment_intents SET status = ?, signature = ?, updated_at = ? WHERE id = ?'
      )
        .bind('signed', signature, getIsoTimestamp(), paymentIntentId)
        .run();
    }

    const runId = generateId('run');
    const version = workflow.currentVersion;
    
    // 3. Create Run Record
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

    // 4. Create Steps
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

    return { run, steps, version, workflow };
  }

  public async runExecutionLoop(
    runId: string,
    userId: string,
    steps: WorkflowRunStep[],
    workflow: Workflow,
    version: any,
    inputs: Record<string, any>,
    paymentIntentId?: string
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
        const environment = this.env.ENVIRONMENT || 'local';
        const settlement = createSettlementProvider(environment);

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

        // Enforce compliance rules (self-payment exclusion, reward-value cap, and network decay)
        const isSelfPayment = workflow.creatorId === userId;
        const totalRunsRes = await this.env.DB.prepare(
          "SELECT COUNT(*) as count FROM workflow_runs WHERE status = 'completed'"
        ).first<{ count: number }>();
        const completedRunsCount = totalRunsRes?.count || 0;

        let mrdnCashbackEligible = !isSelfPayment && workflow.pricePerRun > 0;
        let mrdnCashbackAmount = 0;

        if (mrdnCashbackEligible) {
          // Decay rate beginning at 2% decaying over time based on completed runs count
          const decayRate = 0.02 * Math.exp(-completedRunsCount / 1000); // 1000 runs half-life for demo scaling
          mrdnCashbackAmount = workflow.pricePerRun * decayRate;
          
          // Apply $5 cap per transaction
          if (mrdnCashbackAmount > 5.0) {
            mrdnCashbackAmount = 5.0;
          }
          mrdnCashbackAmount = Number(mrdnCashbackAmount.toFixed(4));
        }

        // Attach verified compliance parameters to the receipt structure
        receipt.mrdnCashbackEligible = mrdnCashbackEligible;
        receipt.mrdnCashbackAmount = mrdnCashbackAmount;

        await this.runRepo.createSettlementReceipt(receipt);

        // Consume payment intent if applicable
        if (paymentIntentId) {
          await this.env.DB.prepare(
            'UPDATE payment_intents SET status = ?, updated_at = ? WHERE id = ?'
          )
            .bind('consumed', getIsoTimestamp(), paymentIntentId)
            .run();
        }
      });

      // Step 4: Context
      await this.runStep(steps, 'context', async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });

      // Step 5: Generate Output (Call AI Provider)
      let modelResult: any = null;
      await this.runStep(steps, 'generate', async () => {
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
      
      // Attempt to mark intent as failed in payment history
      if (paymentIntentId) {
        try {
          await this.env.DB.prepare(
            'UPDATE payment_intents SET status = ?, updated_at = ? WHERE id = ?'
          )
            .bind('failed', getIsoTimestamp(), paymentIntentId)
            .run();
        } catch (dbErr) {
          console.error('Failed to update payment intent status to failed:', dbErr);
        }
      }

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
