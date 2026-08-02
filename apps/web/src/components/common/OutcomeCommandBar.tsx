import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, Bot, Shield, Coins, CheckCircle, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { TruthStateBadge } from './TruthStateBadge';

export interface OutcomeCommandBarProps {
  placeholder?: string;
  className?: string;
}

export const OutcomeCommandBar: React.FC<OutcomeCommandBarProps> = ({
  placeholder = 'What would you like Nexus to help you accomplish?',
  className = '',
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [proposedPlan, setProposedPlan] = useState<{
    goal: string;
    agentName: string;
    creator: string;
    estimatedPrice: string;
    permissions: string[];
    maturity: 'production' | 'beta';
    route: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Simulate smart goal planning synthesis
    const q = query.toLowerCase();
    let plan = {
      goal: query,
      agentName: 'General Research & Analysis Agent',
      creator: 'Nexus Core',
      estimatedPrice: '$0.50',
      permissions: ['Read public web context', 'Generate structured summary'],
      maturity: 'production' as const,
      route: `/explore?q=${encodeURIComponent(query)}`,
    };

    if (q.includes('contract') || q.includes('risk') || q.includes('audit') || q.includes('code')) {
      plan = {
        goal: query,
        agentName: 'Autonomous Security & Code Auditor',
        creator: 'CyberGuard Labs',
        estimatedPrice: '$0.75',
        permissions: ['Read source file repository', 'Execute AST vulnerability check'],
        maturity: 'production' as const,
        route: '/explore?q=Security',
      };
    } else if (q.includes('policy') || q.includes('document') || q.includes('rag')) {
      plan = {
        goal: query,
        agentName: 'Document Insight & Vector RAG Extractor',
        creator: 'DataMesh Studio',
        estimatedPrice: '$0.30',
        permissions: ['Read uploaded document store', 'Query vector embeddings'],
        maturity: 'production' as const,
        route: '/explore?q=Vector',
      };
    }

    setProposedPlan(plan);
    setShowPreview(true);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-[var(--nx-surface-1)] border border-[#6366F1]/40 focus-within:border-[#06B6D4] rounded-2xl shadow-2xl p-2.5 transition-all backdrop-blur-2xl">
          <Sparkles className="h-5 w-5 text-[#06B6D4] ml-3 shrink-0 animate-pulse" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="shrink-0 font-bold px-5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-95 shadow-lg shadow-indigo-600/30"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Plan
          </Button>
        </div>
      </form>

      {/* Outcome Plan Preview Modal */}
      {showPreview && proposedPlan && (
        <div className="fixed inset-0 z-layer-modal flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[var(--nx-surface-1)] border border-[#6366F1]/40 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[var(--nx-border)] pb-4">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-[#06B6D4]" />
                <h3 className="font-display font-extrabold text-base text-white">Proposed Execution Plan</h3>
              </div>
              <TruthStateBadge status={proposedPlan.maturity} />
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="space-y-1 bg-[var(--nx-bg-subtle)] p-3 rounded-xl border border-[var(--nx-border)]">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Goal</span>
                <p className="text-white font-medium">{proposedPlan.goal}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Recommended Capability</span>
                <div className="flex items-center justify-between bg-[var(--nx-surface-2)] p-3 rounded-xl border border-[var(--nx-border)]">
                  <div>
                    <span className="font-bold text-white block">{proposedPlan.agentName}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">by {proposedPlan.creator}</span>
                  </div>
                  <span className="text-emerald-400 font-mono font-bold text-sm">{proposedPlan.estimatedPrice}</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Required Permissions</span>
                <ul className="space-y-1 text-zinc-300">
                  {proposedPlan.permissions.map((perm, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-[#06B6D4]" />
                      <span>{perm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--nx-border)]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(false)}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                size="sm"
                className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] font-bold"
                leftIcon={<Play className="h-3.5 w-3.5" />}
                onClick={() => {
                  setShowPreview(false);
                  navigate(proposedPlan.route);
                }}
              >
                Proceed & Run
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutcomeCommandBar;
