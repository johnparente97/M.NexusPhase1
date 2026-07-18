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
      
      {/* Figma-Like Visual Flow Canvas Header */}
      <div className="col-span-1 lg:col-span-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 mb-2 relative overflow-hidden backdrop-blur-xs">
        {/* Subtle grid pattern inside */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-50" />
        
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-1.5 z-10 relative">
          <span className="h-2 w-2 rounded-full bg-[#27F293]" />
          Visual Capability Logic Canvas
        </h4>
        
        {/* Visual Node Graph */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-4 px-2 relative z-10">
          
          {/* Node 1: Inputs */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div 
              onClick={() => setActiveTab('inputs')}
              className="bg-[#1E1E20] border border-zinc-800 rounded-lg p-3 w-40 text-center relative group hover:border-[#27F293]/50 hover:bg-[#1E1E20]/80 cursor-pointer hover:scale-105 active:scale-97 transition-all shadow-lg select-none"
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-[#27F293]/10 text-[#27F293] border border-[#27F293]/20 text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                1. Inputs Gate
              </div>
              <p className="text-xs font-bold text-zinc-200 mt-1">{formValues.inputDefinitions?.length || 0} Fields</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Parameters Definition</p>
              <div className="absolute top-1/2 -translate-y-1/2 -right-1 h-2 w-2 rounded-full bg-zinc-700 group-hover:bg-[#27F293] transition-colors" />
            </div>
          </div>

          <div className="hidden sm:block text-zinc-650 font-bold select-none">➜</div>

          {/* Node 2: AI Processor */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div 
              onClick={() => {
                setActiveTab('basics');
                setTimeout(() => {
                  const el = document.getElementById('modelProvider') || document.getElementsByName('modelProvider')[0];
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 50);
              }}
              className="bg-[#1E1E20] border border-zinc-800 rounded-lg p-3 w-40 text-center relative group hover:border-[#27F293]/50 hover:bg-[#1E1E20]/80 cursor-pointer hover:scale-105 active:scale-97 transition-all shadow-lg select-none"
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-[#27F293]/10 text-[#27F293] border border-[#27F293]/20 text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                2. AI Synthesis
              </div>
              <p className="text-xs font-bold text-zinc-200 mt-1 uppercase">{formValues.modelProvider || 'gemini'}</p>
              <p className="text-[10px] text-zinc-500 mt-0.5 truncate max-w-full px-1">{formValues.modelId || 'gemini-2.5-flash'}</p>
              <div className="absolute top-1/2 -translate-y-1/2 -left-1 h-2 w-2 rounded-full bg-zinc-700 group-hover:bg-[#27F293] transition-colors" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-1 h-2 w-2 rounded-full bg-zinc-700 group-hover:bg-[#27F293] transition-colors" />
            </div>
          </div>

          <div className="hidden sm:block text-zinc-650 font-bold select-none">➜</div>

          {/* Node 3: Verification */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div 
              onClick={() => setActiveTab('inputs')}
              className="bg-[#1E1E20] border border-zinc-800 rounded-lg p-3 w-40 text-center relative group hover:border-[#27F293]/50 hover:bg-[#1E1E20]/80 cursor-pointer hover:scale-105 active:scale-97 transition-all shadow-lg select-none"
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-[#27F293]/10 text-[#27F293] border border-[#27F293]/20 text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                3. Trust Engine
              </div>
              <p className="text-xs font-bold text-zinc-200 mt-1">Grounded Audit</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Zod Schema Validation</p>
              <div className="absolute top-1/2 -translate-y-1/2 -left-1 h-2 w-2 rounded-full bg-zinc-700 group-hover:bg-[#27F293] transition-colors" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-1 h-2 w-2 rounded-full bg-zinc-700 group-hover:bg-[#27F293] transition-colors" />
            </div>
          </div>

          <div className="hidden sm:block text-zinc-650 font-bold select-none">➜</div>

          {/* Node 4: Settlement */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div 
              onClick={() => {
                setActiveTab('basics');
                setTimeout(() => {
                  const el = document.getElementById('pricePerRun') || document.getElementsByName('pricePerRun')[0];
                  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 50);
              }}
              className="bg-[#1E1E20] border border-[#27F293]/20 rounded-lg p-3 w-40 text-center relative group hover:border-[#27F293]/60 hover:bg-[#1E1E20]/80 cursor-pointer hover:scale-105 active:scale-97 transition-all shadow-[0_4px_20px_0_rgba(39,242,147,0.05)] select-none"
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-[#27F293]/15 text-[#27F293] border border-[#27F293]/35 text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                4. Mpay Settlement
              </div>
              <p className="text-xs font-bold text-[#27F293] mt-1">${formValues.pricePerRun || '0.00'}</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Simulated x402 Rail</p>
              <div className="absolute top-1/2 -translate-y-1/2 -left-1 h-2 w-2 rounded-full bg-zinc-700 group-hover:bg-[#27F293] transition-colors" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-1 h-2 w-2 rounded-full bg-zinc-700 group-hover:bg-[#27F293] transition-colors" />
            </div>
          </div>

          <div className="hidden sm:block text-zinc-650 font-bold select-none">➜</div>

          {/* Node 5: Output */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div 
              onClick={() => setActiveTab('outputs')}
              className="bg-[#1E1E20] border border-zinc-800 rounded-lg p-3 w-40 text-center relative group hover:border-[#27F293]/50 hover:bg-[#1E1E20]/80 cursor-pointer hover:scale-105 active:scale-97 transition-all shadow-lg select-none"
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-[#27F293]/10 text-[#27F293] border border-[#27F293]/20 text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                5. Outcome Receipt
              </div>
              <p className="text-xs font-bold text-zinc-200 mt-1">{formValues.outputDefinitions?.length || 0} Sections</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Structured Markdown</p>
              <div className="absolute top-1/2 -translate-y-1/2 -left-1 h-2 w-2 rounded-full bg-zinc-700 group-hover:bg-[#27F293] transition-colors" />
            </div>
          </div>

        </div>
      </div>

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
