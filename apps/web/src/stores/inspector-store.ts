import { create } from 'zustand';
import { Workflow, WorkflowRun } from '@meridian-nexus/shared-types';

interface InspectorState {
  selectedWorkflow: Workflow | null;
  selectedRun: WorkflowRun | null;
  setSelectedWorkflow: (wf: Workflow | null) => void;
  setSelectedRun: (run: WorkflowRun | null) => void;
}

export const useInspectorStore = create<InspectorState>((set) => ({
  selectedWorkflow: null,
  selectedRun: null,
  setSelectedWorkflow: (wf) => set({ selectedWorkflow: wf, selectedRun: null }),
  setSelectedRun: (run) => set({ selectedRun: run, selectedWorkflow: null }),
}));
