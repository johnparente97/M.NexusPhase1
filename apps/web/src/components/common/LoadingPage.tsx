import { Loader2 } from 'lucide-react';
import { NexusLogoMark } from './NexusLogoMark';

export default function LoadingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-950 min-h-[50vh]">
      <NexusLogoMark className="h-10 w-10 text-emerald-500 mb-6" />
      <Loader2 className="h-6 w-6 text-emerald-500 animate-spin shrink-0 mb-3" />
      <span className="text-xs text-zinc-400 font-semibold select-none tracking-wide flex items-center gap-1.5">
        <span>Loading Nexus...</span>
      </span>
    </div>
  );
}
