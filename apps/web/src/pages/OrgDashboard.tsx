import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  Users,
  ShieldCheck,
  Building2,
  DollarSign,
  PieChart,
  UserPlus,
  Lock,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { formatCurrency } from '../utils/format';

export default function OrgDashboard() {
  const [members] = useState([
    { id: 'usr-1', name: 'Organization Owner', email: 'owner@meridian.finance', role: 'Owner', spend: '$142.50' },
    { id: 'usr-2', name: 'Platform Admin', email: 'admin@meridian.finance', role: 'Administrator', spend: '$89.20' },
    { id: 'usr-3', name: 'Core Developer', email: 'dev@meridian.finance', role: 'Developer', spend: '$34.10' },
    { id: 'usr-4', name: 'Treasury Lead', email: 'finance@meridian.finance', role: 'Finance Manager', spend: '$12.00' },
  ]);

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 gap-8 select-none pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#27F293]" />
            <h1 className="text-xl font-display font-bold text-zinc-100">Meridian Enterprise Organization</h1>
          </div>
          <p className="text-xs text-zinc-400">
            Manage team access roles, organization balances, spend limits, and governance policy rules.
          </p>
        </div>

        <Button variant="primary" size="sm" className="font-bold flex items-center gap-1.5 text-xs shrink-0">
          <UserPlus className="h-4 w-4" />
          Invite Team Member
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Org Shared Balance</span>
          <span className="text-2xl font-bold text-[#27F293]">{formatCurrency(1250.00)}</span>
          <span className="text-[10px] text-zinc-400 mt-1">Base Sepolia Managed</span>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Monthly Spend</span>
          <span className="text-2xl font-bold text-zinc-200">{formatCurrency(277.80)}</span>
          <span className="text-[10px] text-emerald-400 mt-1">Within Budget ($500 Cap)</span>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Active Members</span>
          <span className="text-2xl font-bold text-zinc-200">4 / 10 Users</span>
          <span className="text-[10px] text-zinc-500 mt-1">Enterprise Tier</span>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-1">
          <span className="text-[10px] font-mono text-zinc-500 uppercase">Governance Policy</span>
          <span className="text-2xl font-bold text-emerald-400">Enforced</span>
          <span className="text-[10px] text-zinc-500 mt-1">Zero-Log Encryption</span>
        </Card>
      </div>

      {/* Members Table */}
      <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
          <Users className="h-4 w-4 text-[#27F293]" />
          Team Members & Spend Caps
        </h3>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 font-mono text-[10px] uppercase">
                <th className="pb-3 font-semibold">User</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Monthly Spend</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {members.map((m) => (
                <tr key={m.id}>
                  <td className="py-3 flex flex-col">
                    <span className="font-semibold text-zinc-100">{m.name}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">{m.email}</span>
                  </td>
                  <td className="py-3">
                    <Badge variant="outline" className="text-[9px] font-mono">{m.role}</Badge>
                  </td>
                  <td className="py-3 font-mono font-semibold text-zinc-200">{m.spend}</td>
                  <td className="py-3 text-right">
                    <span className="text-emerald-400 font-mono text-[10px] font-bold">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
