import { Link } from 'react-router-dom';
import { NexusLogoMark } from '../common/NexusLogoMark';

export default function Footer() {
  return (
    <footer className="bg-[#0E0E14] border-t border-white/[0.07] pt-12 pb-20 md:pb-12 px-6 text-zinc-400 font-sans select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Branding Info */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600/15 ring-1 ring-violet-500/30">
              <NexusLogoMark className="h-5 w-5 text-violet-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-violet-300 transition-colors">
                Nexus
              </span>
            </div>
          </Link>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The independent workspace and distribution platform for intelligent digital capabilities. Build, deploy, and scale autonomous agents with verifiable execution.
          </p>
        </div>

        {/* Product Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-medium text-sm text-white">Product Workspace</h4>
          <Link to="/chat" className="text-xs hover:text-violet-300 transition-colors">AI Chat & Reasoning</Link>
          <Link to="/explore" className="text-xs hover:text-violet-300 transition-colors">Explore Marketplace</Link>
          <Link to="/studio" className="text-xs hover:text-violet-300 transition-colors">Workflow Studio</Link>
          <Link to="/cloud" className="text-xs hover:text-violet-300 transition-colors">Nexus Cloud</Link>
          <Link to="/payments" className="text-xs hover:text-violet-300 transition-colors">Payments & Vault</Link>
          <Link to="/activity" className="text-xs hover:text-violet-300 transition-colors">Activity & Receipts</Link>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-medium text-sm text-white">Developers & Ecosystem</h4>
          <Link to="/integrations" className="text-xs hover:text-violet-300 transition-colors">Integrations Registry</Link>
          <Link to="/developer" className="text-xs hover:text-violet-300 transition-colors">Dev Console</Link>
          <Link to="/docs" className="text-xs hover:text-violet-300 transition-colors">Documentation</Link>
          <Link to="/trust" className="text-xs hover:text-violet-300 transition-colors">Trust Center</Link>
        </div>

        {/* Community & Legal */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-medium text-sm text-white">Legal & Compliance</h4>
          <Link to="/trust" className="text-xs hover:text-violet-300 transition-colors">Terms of Service</Link>
          <Link to="/trust" className="text-xs hover:text-violet-300 transition-colors">Privacy Policy</Link>
          <Link to="/trust" className="text-xs hover:text-violet-300 transition-colors">Security Audits</Link>
        </div>

      </div>

      {/* Copyright & Disclosure */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <NexusLogoMark className="h-5 w-5 opacity-80 text-violet-400" />
          <span>© {new Date().getFullYear()} Nexus Platform. All rights reserved.</span>
        </div>
        <p className="max-w-md leading-normal text-[11px] sm:text-right">
          <strong className="text-zinc-300">Demonstration Sandbox</strong>: All network transactions and metrics are currently operating in verified sandbox adapter mode.
        </p>
      </div>
    </footer>
  );
}
