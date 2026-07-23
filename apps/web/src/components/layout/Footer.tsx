import { Link } from 'react-router-dom';
import { NexusLogoMark } from '../common/NexusLogoMark';

export default function Footer() {
  return (
    <footer className="bg-[#171719] border-t border-zinc-800/80 pt-16 pb-24 md:pb-16 px-6 text-[#717171] font-sans select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Branding Info */}
        <div className="md:col-span-2 flex flex-col gap-4 max-w-sm">
          <Link to="/" className="flex items-center gap-3 group">
            <NexusLogoMark className="h-8 w-8 object-contain" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                Meridian Nexus
              </span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest leading-none">
                AI & Workflow Suite
              </span>
            </div>
          </Link>
          <p className="text-xs text-[#717171] leading-relaxed">
            The official AI model inference & workflow orchestration platform for the Meridian Ecosystem. Pay per prompt at sub-penny rates with instant x402 Web3 settlement & 5% cashback rewards.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Meridian Protocol Native</span>
          </div>
        </div>

        {/* Platform Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-medium text-sm text-white">Platform</h4>
          <a href="https://mrdn.finance/" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">Home</a>
          <a href="https://docs.mrdn.finance/" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">Docs</a>
          <a href="https://mrdn.finance/auth" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">Command Centre</a>
          <a href="https://pay.mrdn.finance/" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors"><span className="text-emerald-400 font-bold">M</span>pay</a>
          <a href="https://aerodrome.finance/swap?from=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&to=0xe57e601c06689d3e2bf7db7bebb14b4ff28400c6&chain0=8453&chain1=8453" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">Swap $MRDN</a>
          <a href="https://demo.mrdn.finance/" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-400 hover:text-emerald-300 font-mono transition-colors">x402 Demos ↗</a>
        </div>

        {/* Nexus Workspaces */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-medium text-sm text-white">Nexus Suite</h4>
          <Link to="/chat" className="text-xs hover:text-white transition-colors">Inference Hub</Link>
          <Link to="/exchange" className="text-xs hover:text-white transition-colors">Workflow Market</Link>
          <Link to="/marketplace/models" className="text-xs hover:text-white transition-colors">Model Hub</Link>
          <Link to="/balance" className="text-xs hover:text-white transition-colors">AI Vault</Link>
          <Link to="/studio" className="text-xs hover:text-white transition-colors">Workflow Builder</Link>
          <Link to="/activity" className="text-xs hover:text-white transition-colors">Live Activity</Link>
          <Link to="/developer" className="text-xs hover:text-white transition-colors">Dev Hub</Link>
        </div>

        {/* Community & Legal */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-medium text-sm text-white">Community</h4>
          <a href="https://github.com/meridian-protocol" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors flex items-center gap-1.5">
            GitHub
          </a>
          <a href="https://x.com/mrdn_finance" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors flex items-center gap-1.5">
            X / Twitter
          </a>
          <a href="https://t.me/mrdnfinance" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors flex items-center gap-1.5">
            Telegram
          </a>
          <div className="pt-2 flex flex-col gap-1.5">
            <a href="https://mrdn.finance/terms" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">Terms of Service</a>
            <a href="https://mrdn.finance/privacy" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>

      </div>

      {/* Copyright & Disclosure */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#717171]">
        <div className="flex items-center gap-2">
          <NexusLogoMark className="h-5 w-5 opacity-80" />
          <span>© {new Date().getFullYear()} Meridian Protocol. All rights reserved.</span>
        </div>
        <p className="max-w-md leading-normal text-[11px] sm:text-right">
          <strong className="text-zinc-300">Demonstration Disclosure</strong>: Operating in fallback demonstration mode. All transactions, credits, and metrics are simulated on Base Sepolia.
        </p>
      </div>
    </footer>
  );
}
