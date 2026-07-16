import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createWorkflowSchema } from '@meridian-nexus/validation';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import InputFieldEditor from './InputFieldEditor';
import OutputSchemaEditor from './OutputSchemaEditor';
import WorkflowPreview from './WorkflowPreview';
import { WORKFLOW_CATEGORIES, Workflow } from '@meridian-nexus/shared-types';
import { useCreateWorkflow, useUpdateWorkflow } from '../../hooks/useWorkflows';
import { useToast } from '../ui/Toast';
import { useNavigate } from 'react-router-dom';

export interface WorkflowBuilderProps {
  initialData?: Workflow | null;
}

export const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({ initialData }) => {
  const [activeTab, setActiveTab] = useState<'basics' | 'inputs' | 'outputs' | 'preview'>('basics');
  const { toast } = useToast();
  const navigate = useNavigate();

  const createMutation = useCreateWorkflow();
  const updateMutation = useUpdateWorkflow(initialData?.id || '');

  // 1. Setup default values
  const defaultValues = initialData ? {
    name: initialData.name,
    shortDescription: initialData.shortDescription,
    fullDescription: initialData.fullDescription,
    outcomeStatement: initialData.outcomeStatement,
    category: initialData.category,
    tags: initialData.tags,
    isFree: initialData.isFree,
    pricePerRun: initialData.pricePerRun,
    estimatedDurationSeconds: initialData.estimatedDurationSeconds,
    systemInstructions: initialData.currentVersion?.systemInstructions || '',
    creatorInstructions: initialData.currentVersion?.creatorInstructions || '',
    modelProvider: initialData.currentVersion?.modelProvider || 'gemini',
    modelId: initialData.currentVersion?.modelId || 'gemini-2.5-flash',
    inputDefinitions: initialData.currentVersion?.inputDefinitions || [],
    outputDefinitions: initialData.currentVersion?.outputDefinitions || [],
  } : {
    name: '',
    shortDescription: '',
    fullDescription: '',
    outcomeStatement: '',
    category: 'research',
    tags: [],
    isFree: true,
    pricePerRun: 0,
    estimatedDurationSeconds: 30,
    systemInstructions: '',
    creatorInstructions: '',
    modelProvider: 'gemini',
    modelId: 'gemini-2.5-flash',
    inputDefinitions: [
      {
        fieldKey: 'query',
        label: 'Search Query',
        description: 'What key parameters are we looking up?',
        type: 'text',
        placeholder: 'e.g., Stripe corporate strategies',
        required: true,
        defaultValue: '',
        displayOrder: 0,
      },
    ],
    outputDefinitions: [
      {
        sectionKey: 'summary',
        label: 'Strategic Summary',
        type: 'paragraph',
        description: 'High-level synthesis',
        displayOrder: 0,
      },
    ],
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: defaultValues as any,
  });

  const formValues = watch();

  const handleSave = (data: any) => {
    if (initialData) {
      updateMutation.mutate(data, {
        onSuccess: () => {
          toast('Workflow updated successfully!', 'success');
          navigate('/studio');
        },
        onError: (err) => {
          toast(err.message || 'Failed to update workflow.', 'error');
        },
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          toast('Workflow created draft successfully!', 'success');
          navigate('/studio');
        },
        onError: (err) => {
          toast(err.message || 'Failed to create workflow.', 'error');
        },
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full px-6 py-4.5 select-none">
      
      {/* Tab Selectors Left Sidebar panel */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <Card className="flex flex-col gap-1 p-3 bg-zinc-900 border-zinc-800">
          <button
            onClick={() => setActiveTab('basics')}
            className={`text-left text-xs font-semibold px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'basics' ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            1. Basic Information
          </button>
          <button
            onClick={() => setActiveTab('inputs')}
            className={`text-left text-xs font-semibold px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'inputs' ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            2. Input parameters definitions
          </button>
          <button
            onClick={() => setActiveTab('outputs')}
            className={`text-left text-xs font-semibold px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'outputs' ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            3. Output layout structures
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`text-left text-xs font-semibold px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'preview' ? 'bg-indigo-500/10 text-indigo-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            4. Preview & Test
          </button>
        </Card>

        <Button
          onClick={handleSubmit(handleSave)}
          variant="primary"
          isLoading={createMutation.isPending || updateMutation.isPending}
          className="font-bold"
        >
          {initialData ? 'Save Updates' : 'Create Workflow Draft'}
        </Button>
      </div>

      {/* Main Editing View Area */}
      <Card className="lg:col-span-2 bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-6">
        
        {activeTab === 'basics' && (
          <div className="flex flex-col gap-5">
            <h3 className="text-base font-semibold text-zinc-200">Basics Info</h3>

            <Input
              {...register('name')}
              label="Workflow Name"
              placeholder="e.g., Company Competitors Analyst"
              required
              error={errors.name?.message as any}
            />

            <Input
              {...register('shortDescription')}
              label="Short Description"
              placeholder="e.g., Map and score key competitor targets using strategic criteria structures."
              required
              error={errors.shortDescription?.message as any}
            />

            <Textarea
              {...register('fullDescription')}
              label="Full Description"
              placeholder="Detailed description explaining outcome goals and technical layers..."
              required
              error={errors.fullDescription?.message as any}
            />

            <Input
              {...register('outcomeStatement')}
              label="Outcome Statement"
              placeholder="e.g., Maps and scores competitor landscape report"
              required
              error={errors.outcomeStatement?.message as any}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Marketplace Category"
                    required
                    error={errors.category?.message as any}
                    options={WORKFLOW_CATEGORIES}
                  />
                )}
              />

              <Input
                {...register('estimatedDurationSeconds', { valueAsNumber: true })}
                type="number"
                label="Estimated Duration (seconds)"
                required
                error={errors.estimatedDurationSeconds?.message as any}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="modelProvider"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Model Provider"
                    required
                    options={[
                      { label: 'Google Gemini', value: 'gemini' },
                      { label: 'Mock/Demo Engine', value: 'demo' },
                    ]}
                  />
                )}
              />

              <Controller
                name="modelId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Model Instance ID"
                    required
                    options={[
                      { label: 'Gemini 2.5 Flash', value: 'gemini-2.5-flash' },
                      { label: 'Gemini 2.5 Pro', value: 'gemini-2.5-pro' },
                      { label: 'Demo Fallback Engine', value: 'demo-v1' },
                    ]}
                  />
                )}
              />
            </div>

            <Textarea
              {...register('systemInstructions')}
              label="System Instructions"
              placeholder="e.g., You are a research analyst, analyze the input parameters..."
              required
              error={errors.systemInstructions?.message as any}
            />

            <Input
              {...register('pricePerRun', { valueAsNumber: true })}
              type="number"
              step="0.01"
              label="Price Per Run ($)"
              required
              error={errors.pricePerRun?.message as any}
            />
          </div>
        )}

        {activeTab === 'inputs' && (
          <InputFieldEditor
            values={formValues.inputDefinitions || []}
            onChange={(defs) => setValue('inputDefinitions', defs)}
          />
        )}

        {activeTab === 'outputs' && (
          <OutputSchemaEditor
            values={formValues.outputDefinitions || []}
            onChange={(defs) => setValue('outputDefinitions', defs)}
          />
        )}

        {activeTab === 'preview' && (
          <WorkflowPreview workflow={formValues} />
        )}

      </Card>

    </div>
  );
};
export default WorkflowBuilder;
