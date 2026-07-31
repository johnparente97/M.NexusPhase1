import { Loader2 } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-950 min-h-[50vh]">
      <Loader2 className="h-8 w-8 text-emerald-500 animate-spin shrink-0" />
      <span className="text-xs text-zinc-400 mt-3 font-semibold select-none tracking-wide flex items-center gap-1.5">
        <span>Loading Nexus...</span>
        <span className="text-[10px] font-mono prismatic-text font-bold">(Powered by Meridian)</span>
      </span>
    </div>
  );
}
