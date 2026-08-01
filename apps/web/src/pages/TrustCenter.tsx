import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Globe,
  FileText,
  AlertCircle,
  CheckCircle2,
  Server,
  Key,
  Shield,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { cn } from '../utils/cn';

interface JurisdictionStatus {
  country: string;
  code: string;
  aiMarketplace: 'Available' | 'Verification Required';
  storageService: 'Available';
  deFiTools: 'Available' | 'Professional Only' | 'Restricted';
  statusColor: string;
}

const JURISDICTION_MATRIX: JurisdictionStatus[] = [
  {
    country: 'United States',
    code: 'US',
    aiMarketplace: 'Available',
    storageService: 'Available',
    deFiTools: 'Professional Only',
    statusColor: 'text-amber-400',
  },
  {
    country: 'European Union (27 Nations)',
    code: 'EU',
    aiMarketplace: 'Available',
    storageService: 'Available',
    deFiTools: 'Available',
    statusColor: 'text-emerald-400',
  },
  {
    country: 'United Kingdom',
    code: 'UK',
    aiMarketplace: 'Available',
    storageService: 'Available',
    deFiTools: 'Available',
    statusColor: 'text-emerald-400',
  },
  {
    country: 'Japan',
    code: 'JP',
    aiMarketplace: 'Available',
    storageService: 'Available',
    deFiTools: 'Available',
    statusColor: 'text-emerald-400',
  },
  {
    country: 'Sanctioned Regions (FATF High Risk)',
    code: 'OFAC',
    aiMarketplace: 'Verification Required',
    storageService: 'Available',
    deFiTools: 'Restricted',
    statusColor: 'text-rose-400',
  },
];

const LEGAL_DOCUMENTS = [
  { title: 'Terms of Service', tag: 'Core Agreement' },
  { title: 'Privacy Policy', tag: 'Data Handling' },
  { title: 'Cookie & Tracking Policy', tag: 'Privacy' },
  { title: 'Acceptable Use Policy', tag: 'Conduct' },
  { title: 'Marketplace Provider Terms', tag: 'Commerce' },
  { title: 'DeFi Risk Disclosures', tag: 'Financial' },
  { title: 'AI Transparency & Model Policy', tag: 'AI Governance' },
  { title: 'Storage & Encryption Agreement', tag: 'Infrastructure' },
  { title: 'Data Processing Addendum (DPA)', tag: 'GDPR/CCPA' },
  { title: 'Accessibility Statement (WCAG 2.2 AA)', tag: 'A11y' },
];

export default function TrustCenter() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  return (
    <div className="space-y-8 pb-16">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <ShieldCheck className="h-6 w-6 text-emerald-400" />
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Nexus Trust & Compliance Center
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
            Transparent platform security status, privacy controls, jurisdiction availability matrix, zero-knowledge encryption standards, and complete legal governance framework.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 py-2 rounded-xl">
          <CheckCircle2 className="h-4 w-4" />
          <span>All Core Systems Operational</span>
        </div>
      </div>

      {/* ── Security & Privacy Pillar Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#121216] border border-zinc-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="font-display text-base font-bold text-white">Client-Side Zero-Knowledge</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            AI memory, workflow outputs, and stored files support end-to-end client-side encryption. Keys remain exclusively under user control.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121216] border border-zinc-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit">
            <Globe className="h-5 w-5" />
          </div>
          <h3 className="font-display text-base font-bold text-white">Jurisdiction Availability Matrix</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Granular country-by-country eligibility enforcement ensures features comply with regional regulatory standards prior to user execution.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#121216] border border-zinc-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="font-display text-base font-bold text-white">Provider Integrity & Audits</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Marketplace capabilities undergo automated sandbox testing, latency verification, uptime tracking, and provider security questionnaires.
          </p>
        </div>
      </div>

      {/* ── Jurisdiction Eligibility Matrix ── */}
      <div className="rounded-2xl bg-[#121216] border border-zinc-800 p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-cyan-400" />
              <span>Jurisdiction & Regional Availability Matrix</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Real-time status of service availability across global jurisdictions.</p>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
            Updated Aug 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 uppercase">
                <th className="py-2.5 px-3">Jurisdiction</th>
                <th className="py-2.5 px-3">AI Marketplace</th>
                <th className="py-2.5 px-3">Storage Services</th>
                <th className="py-2.5 px-3">DeFi Tools</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {JURISDICTION_MATRIX.map((j) => (
                <tr key={j.code} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-3 px-3 font-bold text-white font-sans">{j.country} ({j.code})</td>
                  <td className="py-3 px-3 text-emerald-400">✓ {j.aiMarketplace}</td>
                  <td className="py-3 px-3 text-emerald-400">✓ {j.storageService}</td>
                  <td className={cn("py-3 px-3 font-bold", j.statusColor)}>{j.deFiTools}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Governance & Legal Documents Explorer ── */}
      <div className="rounded-2xl bg-[#121216] border border-zinc-800 p-6 space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-400" />
              <span>Legal Governance & Compliance Documentation</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Formal disclosures and operational frameworks prepared for professional legal review.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LEGAL_DOCUMENTS.map((doc) => (
            <button
              key={doc.title}
              onClick={() => setSelectedDoc(doc.title)}
              className="p-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-purple-500/40 text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <span className="text-xs font-medium text-white group-hover:text-purple-200">{doc.title}</span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {doc.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── MODAL: Legal Document Viewer Placeholder ── */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl rounded-2xl bg-[#121216] border border-purple-500/30 p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="font-display text-base font-bold text-white">{selectedDoc}</h3>
                  <p className="text-[10px] font-mono text-purple-300">Nexus Legal Infrastructure • Version 2026.1</p>
                </div>
                <button onClick={() => setSelectedDoc(null)} className="text-zinc-500 hover:text-white text-sm">
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-zinc-300 leading-relaxed max-h-72 overflow-y-auto pr-1 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 font-mono">
                <p className="text-amber-400 font-bold">
                  [LEGAL REVIEW NOTICE: Placeholder documentation framework configured for legal and regulatory verification.]
                </p>
                <p>
                  1. <strong>Scope of Service:</strong> Nexus provides an intelligent operating application for discovering, building, paying for, and managing digital capabilities.
                </p>
                <p>
                  2. <strong>Settlement Mechanics:</strong> Multichain micro-settlement functions via Meridian x402 protocols and self-custody wallet authorizations.
                </p>
                <p>
                  3. <strong>Data Retention & Deletion:</strong> User zero-knowledge files and workflow outputs may be permanently exported or scheduled for automated deletion at user discretion.
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end">
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-5 py-2 rounded-xl bg-purple-500 text-zinc-950 font-bold hover:brightness-110 cursor-pointer text-xs"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
