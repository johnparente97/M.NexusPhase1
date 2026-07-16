import React from 'react';
import WorkflowCard from '../marketplace/WorkflowCard';
import DynamicForm from '../workflow/DynamicForm';
import { Workflow } from '@meridian-nexus/shared-types';

export interface WorkflowPreviewProps {
  workflow: any;
}

export const WorkflowPreview: React.FC<WorkflowPreviewProps> = ({ workflow }) => {
  // Construct a dummy workflow object for card rendering
  const mockWorkflow: Workflow = {
    id: 'preview-id',
    creatorId: 'creator-preview',
    currentVersionId: 'version-preview',
    name: workflow.name || 'Untitled Workflow',
    slug: 'untitled-workflow',
    shortDescription: workflow.shortDescription || 'Provide a brief summary describing what this custom builder does.',
    fullDescription: workflow.fullDescription || '',
    outcomeStatement: workflow.outcomeStatement || '',
    category: workflow.category || 'research',
    tags: workflow.tags || [],
    status: 'draft',
    visibility: workflow.visibility || 'public',
    isFree: workflow.isFree,
    pricePerRun: workflow.pricePerRun || 0,
    estimatedDurationSeconds: workflow.estimatedDurationSeconds || 30,
    totalRuns: 0,
    completedRuns: 0,
    averageRating: 5,
    reviewCount: 0,
    savedCount: 0,
    dataHandlingSummary: workflow.dataHandlingSummary || '',
    refundPolicy: '',
    verified: false,
    verificationLabel: 'Draft Preview',
    thumbnailUrl: null,
    featuredOrder: null,
    deletedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <div className="flex flex-col gap-8 w-full select-none">
      <div className="flex flex-col gap-1 border-b border-zinc-800 pb-3">
        <h4 className="text-xs font-semibold text-zinc-300 font-display">Studio Preview Panel</h4>
        <p className="text-[10px] text-zinc-500">
          Verify how the workflow card and dynamic parameters form will look inside the marketplace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Card Preview */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Card Preview</span>
          <div className="max-w-sm w-full">
            <WorkflowCard workflow={mockWorkflow} />
          </div>
        </div>

        {/* Form Preview */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Form Parameter Inputs Preview</span>
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-5">
            <DynamicForm
              inputDefinitions={workflow.inputDefinitions || []}
              onSubmit={(data) => console.log('Preview submit:', data)}
              onCancel={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkflowPreview;
