import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../ui/Toast';
import DynamicForm from './DynamicForm';
import ExecutionProgress from './ExecutionProgress';
import ResultRenderer from './ResultRenderer';
import SettlementModal from './SettlementModal';
import { Workflow, WorkflowRun, WorkflowVersion } from '@meridian-nexus/shared-types';
import { formatCurrency, formatDuration } from '../../utils/format';
import { ArrowLeft, ArrowRight, Play, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import { useExecuteWorkflow } from '../../hooks/useWorkflowRun';

export interface RunnerWizardProps {
  workflow: Workflow;
}

type Step = 'review' | 'configure' | 'summary' | 'executing' | 'result';

export const RunnerWizard: React.FC<RunnerWizardProps> = ({ workflow }) => {
  const [step, setStep] = useState<Step>('review');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [runRecord, setRunRecord] = useState<WorkflowRun | null>(null);
  const [showSettlement, setShowSettlement] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const executeMutation = useExecuteWorkflow(workflow.id);
  const version = workflow.currentVersion!;

  const handleStartConfigure = () => {
    setStep('configure');
  };

  const handleFormSubmit = (data: Record<string, any>) => {
    setFormData(data);
    setStep('summary');
  };

  const handleAuthorize = () => {
    setShowSettlement(true);
  };

  const handleConfirmSettlement = () => {
    setShowSettlement(false);
    setStep('executing');
    
    // Trigger mutation execute
    executeMutation.mutate(formData, {
      onSuccess: (data) => {
        setRunRecord(data);
        setStep('result');
        toast('Workflow completed execution successfully!', 'success');
      },
      onError: (err) => {
        setStep('configure'); // Reset back to form
        toast(err.message || 'Execution run failed. Please try again.', 'error');
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full px-6 py-4.5">
      
      {/* Steps Indicator Progress Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4 overflow-x-auto no-scrollbar shrink-0 select-none">
        <div className="flex items-center gap-6">
          <span className={`text-xs font-semibold ${step === 'review' ? 'text-indigo-400 font-bold' : 'text-zinc-500'}`}>
            1. Review
          </span>
          <span className={`text-xs font-semibold ${step === 'configure' ? 'text-indigo-400 font-bold' : 'text-zinc-500'}`}>
            2. Configure
          </span>
          <span className={`text-xs font-semibold ${step === 'summary' ? 'text-indigo-400 font-bold' : 'text-zinc-500'}`}>
            3. Summary
          </span>
          <span className={`text-xs font-semibold ${step === 'executing' ? 'text-indigo-400 font-bold' : 'text-zinc-500'}`}>
            4. Run
          </span>
          <span className={`text-xs font-semibold ${step === 'result' ? 'text-indigo-400 font-bold' : 'text-zinc-500'}`}>
            5. Outcome
          </span>
        </div>
      </div>

      {/* Render Steps Panels */}

      {step === 'review' && (
        <Card className="flex flex-col gap-6 bg-zinc-900 border-zinc-800">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-zinc-100">{workflow.name}</h2>
            <p className="text-xs text-zinc-400 leading-normal">{workflow.shortDescription}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4.5 bg-zinc-950 rounded-xl border border-zinc-900">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500 font-semibold uppercase">Price</span>
              <span className="text-sm font-bold text-zinc-200">{workflow.isFree ? 'Free' : formatCurrency(workflow.pricePerRun)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500 font-semibold uppercase">Runtime</span>
              <span className="text-sm font-bold text-zinc-200">{formatDuration(workflow.estimatedDurationSeconds)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500 font-semibold uppercase">Rating</span>
              <span className="text-sm font-bold text-zinc-200">{workflow.averageRating} ★</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-zinc-500 font-semibold uppercase">Category</span>
              <span className="text-sm font-bold text-zinc-200 capitalize">{workflow.category}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-zinc-300">Data and Privacy Summary</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">{workflow.dataHandlingSummary}</p>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 border-t border-zinc-800 pt-5">
            <Button variant="ghost" size="sm" onClick={() => navigate('/exchange')}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleStartConfigure} className="font-bold">
              Start Configuration
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {step === 'configure' && (
        <Card className="bg-zinc-900 border-zinc-800">
          <div className="flex flex-col gap-1 mb-6">
            <h3 className="text-base font-semibold text-zinc-200">Configure Parameters</h3>
            <p className="text-xs text-zinc-500">Provide the required parameter inputs below to seed the models.</p>
          </div>
          <DynamicForm
            inputDefinitions={version.inputDefinitions}
            onSubmit={handleFormSubmit}
            onCancel={() => setStep('review')}
            defaultValues={formData}
          />
        </Card>
      )}

      {step === 'summary' && (
        <Card className="flex flex-col gap-6 bg-zinc-900 border-zinc-800">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold text-zinc-200">Confirm Run details</h3>
            <p className="text-xs text-zinc-500">Review your parameters and authorization values before triggering.</p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-zinc-300">Your Inputs</h4>
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4.5 flex flex-col gap-3 text-xs leading-normal">
              {version.inputDefinitions.map((def) => (
                <div key={def.fieldKey} className="flex justify-between border-b border-zinc-900/50 pb-2">
                  <span className="text-zinc-500 font-semibold">{def.label}:</span>
                  <span className="text-zinc-300 max-w-sm text-right truncate">
                    {typeof formData[def.fieldKey] === 'object'
                      ? JSON.stringify(formData[def.fieldKey])
                      : String(formData[def.fieldKey] ?? '')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-950/20 to-blue-950/20 border border-indigo-900/30 rounded-xl p-4 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-indigo-400">Total Run Cost</span>
              <span className="text-[10px] text-zinc-500">Simulated Meridian value movement</span>
            </div>
            <span className="text-lg font-bold text-zinc-100">
              {workflow.isFree ? 'Free' : formatCurrency(workflow.pricePerRun)}
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 border-t border-zinc-800 pt-5">
            <Button variant="ghost" size="sm" onClick={() => setStep('configure')}>
              Back
            </Button>
            <Button variant="primary" size="sm" onClick={handleAuthorize} className="font-bold">
              Confirm Authorization & Run
              <Play className="h-3.5 w-3.5 fill-current" />
            </Button>
          </div>
        </Card>
      )}

      {step === 'executing' && (
        <Card className="bg-zinc-900 border-zinc-800 min-h-[300px] flex items-center justify-center">
          <ExecutionProgress
            runStatus={executeMutation.isPending ? 'running' : 'completed'}
            estimatedDuration={workflow.estimatedDurationSeconds}
          />
        </Card>
      )}

      {step === 'result' && runRecord && (
        <div className="flex flex-col gap-6 w-full animate-fade-in">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <h2 className="text-base font-semibold text-zinc-200">Execution Result Generated</h2>
            </div>
            <Link to={`/activity/${runRecord.id}`}>
              <Button variant="secondary" size="sm" className="font-bold">
                View Settlement Receipt
              </Button>
            </Link>
          </div>

          {/* Result Output */}
          {runRecord.result && (
            <ResultRenderer result={runRecord.result} workflowName={workflow.name} />
          )}

          <div className="flex justify-end gap-3 border-t border-zinc-800 pt-5">
            <Button variant="secondary" size="sm" onClick={() => setStep('configure')}>
              Run Again
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/exchange')}>
              Back to Exchange
            </Button>
          </div>
        </div>
      )}

      {/* Simulated settlement Authorization Modal */}
      <SettlementModal
        isOpen={showSettlement}
        onClose={() => setShowSettlement(false)}
        amount={workflow.pricePerRun}
        onConfirm={handleConfirmSettlement}
      />

    </div>
  );
};
export default RunnerWizard;
