import { useParams, Link } from 'react-router-dom';
import { useWorkflow } from '../hooks/useWorkflows';
import RunnerWizard from '../components/workflow/RunnerWizard';
import LoadingPage from '../components/common/LoadingPage';
import NotFound from '../components/common/NotFound';
import { ArrowLeft } from 'lucide-react';

export default function WorkflowRunner() {
  const { id } = useParams<{ id: string }>();
  const { data: workflow, isLoading, error } = useWorkflow(id || '');

  if (isLoading) return <LoadingPage />;
  if (error || !workflow) return <NotFound />;

  return (
    <div className="flex-1 flex flex-col gap-4 select-none pb-16">
      <div className="max-w-4xl mx-auto w-full px-6 pt-6 flex items-center gap-2">
        <Link to={`/exchange/${workflow.slug}`} className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 hover:text-zinc-300">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Detail
        </Link>
      </div>

      <RunnerWizard workflow={workflow} />
    </div>
  );
}
