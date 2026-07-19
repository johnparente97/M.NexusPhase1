import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ANTSEED_MODEL_CATALOG } from '../adapters/antseed/adapter';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Bot, Save, ArrowLeft, ShieldCheck, Sparkles, Cpu } from 'lucide-react';
import { useToast } from '../components/ui/Toast';

export default function AgentBuilder() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [agentName, setAgentName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [instructions, setInstructions] = useState('');
  const [primaryModel, setPrimaryModel] = useState('claude-3-5-sonnet');
  const [fallbackModel, setFallbackModel] = useState('dolphin-mixtral-8x7b-free');
  const [maxCostPerRun, setMaxCostPerRun] = useState(0.50);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentName.trim()) {
      toast('Please enter an agent name.', 'warning');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast(`Agent "${agentName}" created and deployed successfully!`, 'success');
      navigate('/studio');
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 gap-6 select-none pb-20">
      
      {/* Back Link */}
      <button onClick={() => navigate('/studio')} className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 hover:text-zinc-300 w-fit">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Studio
      </button>

      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-zinc-900 pb-4">
        <h1 className="text-xl font-display font-bold text-zinc-100 flex items-center gap-2">
          <Bot className="h-5 w-5 text-[#27F293]" />
          Agent Builder
        </h1>
        <p className="text-xs text-zinc-400">
          Configure an autonomous agent with instructions, primary & fallback models, and spending constraints.
        </p>
      </div>

      <form onSubmit={handleSaveAgent} className="flex flex-col gap-6">
        <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-5">
          <Input
            label="Agent Name"
            placeholder="e.g. Senior Financial Analyst Agent"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            required
          />

          <Input
            label="Agent Purpose"
            placeholder="e.g. Audits income statements and calculates profit margins"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />

          <Textarea
            label="System Instructions & Persona"
            placeholder="You are an expert financial auditor. Review inputs for calculation discrepancies..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={5}
          />
        </Card>

        {/* Model Selection & Fallback */}
        <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-5">
          <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-emerald-400" />
            Model & Routing Configuration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Primary Intelligence Model"
              value={primaryModel}
              onChange={(e) => setPrimaryModel(e.target.value)}
              options={ANTSEED_MODEL_CATALOG.map((m) => ({
                value: m.id,
                label: `${m.name} (${m.isFree ? 'Free' : '$' + m.priceInputPerMillion + '/1M'})`,
              }))}
            />

            <Select
              label="Fallback Backup Model"
              value={fallbackModel}
              onChange={(e) => setFallbackModel(e.target.value)}
              options={ANTSEED_MODEL_CATALOG.map((m) => ({
                value: m.id,
                label: `${m.name} (${m.isFree ? 'Free' : '$' + m.priceInputPerMillion + '/1M'})`,
              }))}
            />
          </div>

          <Input
            label="Max Budget Cap Per Run ($ USDC)"
            type="number"
            step="0.05"
            value={maxCostPerRun}
            onChange={(e) => setMaxCostPerRun(Number(e.target.value))}
          />
        </Card>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" size="md" onClick={() => navigate('/studio')}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" isLoading={isSaving} className="font-bold flex items-center gap-2">
            <Save className="h-4 w-4" />
            Deploy Agent
          </Button>
        </div>
      </form>

    </div>
  );
}
