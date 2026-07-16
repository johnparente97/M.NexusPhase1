import { useParams, Link } from 'react-router-dom';
import { useWorkflow } from '../hooks/useWorkflows';
import WorkflowBuilder from '../components/studio/WorkflowBuilder';
import LoadingPage from '../components/common/LoadingPage';
import { ArrowLeft } from 'lucide-react';

export default function StudioEditor() {
  const { id } = useParams<{ id: string }>();
  const { data: workflow, isLoading } = useWorkflow(id || '');

  if (id && isLoading) return <LoadingPage />;

  return (
    <div className="flex-1 flex flex-col gap-4 select-none pb-16">
      <div className="max-w-7xl mx-auto w-full px-6 pt-6 flex items-center gap-2">
        <Link to="/studio" className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 hover:text-zinc-300">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Studio
        </Link>
      </div>

      <WorkflowBuilder initialData={workflow} />
    </div>
  );
}
