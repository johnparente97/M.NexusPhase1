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

export class WorkflowExecutionService {
  private workflowRepo: WorkflowRepository;
  private runRepo: RunRepository;
  private env: Bindings;

  constructor(workflowRepo: WorkflowRepository, runRepo: RunRepository, env: Bindings) {
    this.workflowRepo = workflowRepo;
    this.runRepo = runRepo;
    this.env = env;
  }

  async execute(workflowId: string, userId: string, inputs: Record<string, unknown>): Promise<WorkflowRun> {
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
    return this.runExecutionLoop(runId, steps, workflow, version, parsedInputs.data);
  }

  private async runExecutionLoop(
    runId: string,
    steps: WorkflowRunStep[],
    workflow: Workflow,
    version: any,
    inputs: Record<string, any>
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
        const settlement = new MockMeridianSettlementProvider();
        const auth = await settlement.createAuthorization({
          userId: version.userId ?? 'demo',
          runId,
          amount: workflow.pricePerRun,
          currency: 'USD',
          workflowId: workflow.id,
          workflowName: workflow.name,
        });

        receipt = await settlement.settleUsage({
          authorizationId: auth.authorizationId,
          runId,
          amount: workflow.pricePerRun,
          currency: 'USD',
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
