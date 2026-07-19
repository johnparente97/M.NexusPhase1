import { Loader2 } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-950 min-h-[50vh]">
      <Loader2 className="h-8 w-8 text-emerald-500 animate-spin shrink-0" />
      <span className="text-xs text-zinc-500 mt-3 font-semibold select-none tracking-wide">
        Loading Meridian Nexus...
      </span>
    </div>
  );
}
