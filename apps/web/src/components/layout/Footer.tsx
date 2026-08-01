import { Link } from 'react-router-dom';
import { NexusLogoMark } from '../common/NexusLogoMark';

export default function Footer() {
  return (
    <footer className="bg-[#171719] border-t border-zinc-800/80 pt-12 pb-20 md:pb-12 px-6 text-[#717171] font-sans select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Branding Info */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Link to="/" className="flex items-center gap-3 group">
            <NexusLogoMark className="h-8 w-8 object-contain" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                Nexus
              </span>
            </div>
          </Link>
          <p className="text-xs text-[#717171] leading-relaxed">
            The open AI model inference & workflow orchestration platform. Build, deploy, and scale autonomous agents with unparalleled performance.
          </p>
        </div>

        {/* Product Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-medium text-sm text-white">Product</h4>
          <Link to="/chat" className="text-xs hover:text-white transition-colors">Chat</Link>
          <Link to="/exchange" className="text-xs hover:text-white transition-colors">Workflows</Link>
          <Link to="/marketplace/models" className="text-xs hover:text-white transition-colors">Models</Link>
          <Link to="/balance" className="text-xs hover:text-white transition-colors">Balance</Link>
          <Link to="/studio" className="text-xs hover:text-white transition-colors">Workflow Studio</Link>
          <Link to="/activity" className="text-xs hover:text-white transition-colors">Activity</Link>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-medium text-sm text-white">Resources</h4>
          <Link to="/ecosystem" className="text-xs hover:text-white transition-colors">Ecosystem</Link>
          <Link to="/developer" className="text-xs hover:text-white transition-colors">Developer</Link>
          <Link to="/docs" className="text-xs hover:text-white transition-colors">Documentation</Link>
        </div>

        {/* Community & Legal */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display font-medium text-sm text-white">Community</h4>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">X / Twitter</a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">Telegram</a>
          <div className="pt-2 flex flex-col gap-1.5">
            <Link to="/terms" className="text-xs hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-xs hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>

      {/* Copyright & Disclosure */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#717171]">
        <div className="flex items-center gap-2">
          <NexusLogoMark className="h-5 w-5 opacity-80" />
          <span>© {new Date().getFullYear()} Nexus. All rights reserved.</span>
        </div>
        <p className="max-w-md leading-normal text-[11px] sm:text-right">
          <strong className="text-zinc-300">Demonstration Mode</strong>: All transactions and metrics are currently simulated.
        </p>
      </div>
    </footer>
  );
}
