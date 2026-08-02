import { Outlet, Link } from 'react-router-dom';
import { NexusLogoMark } from '../common/NexusLogoMark';
import { ThemeToggle } from '../common/ThemeToggle';
import { Button } from '../ui/Button';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#05050A] text-[#F8F9FE] flex flex-col antialiased selection:bg-[#FF007F]/30 selection:text-white">
      {/* Top Cyber Header Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#05050A]/90 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 ring-1 ring-purple-500/30 group-hover:ring-[#00F5D4]/60 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <NexusLogoMark className="h-6 w-6" />
              </div>
              <span className="text-xl font-display font-extrabold tracking-tight text-white group-hover:text-prismatic transition-all">
                Nexus
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-400">
              <Link to="/explore" className="transition-colors hover:text-[#00F5D4]">Explore</Link>
              <Link to="/integrations" className="transition-colors hover:text-[#00F5D4]">Integrations</Link>
              <Link to="/developer" className="transition-colors hover:text-[#00F5D4]">Developers</Link>
              <Link to="/trust" className="transition-colors hover:text-[#00F5D4]">Trust & Legal</Link>
              <Link to="/docs" className="transition-colors hover:text-[#00F5D4]">Docs</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle showLabel />
            <Link 
              to="/chat" 
              className="hidden sm:block text-xs font-semibold text-zinc-400 transition-colors hover:text-white"
            >
              Sign In
            </Link>
            <Button
              to="/chat"
              variant="primary"
              size="sm"
            >
              Launch Workspace
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>

      {/* Cyber-Sigil Public Footer */}
      <footer className="border-t border-white/[0.08] bg-[#0A0A14] pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6 mb-12 text-xs">
            <div className="col-span-2 lg:col-span-2 space-y-3">
              <Link to="/" className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 ring-1 ring-purple-500/30">
                  <NexusLogoMark className="h-5 w-5" />
                </div>
                <span className="font-display font-extrabold text-lg text-white">Nexus</span>
              </Link>
              <p className="text-zinc-400 leading-relaxed max-w-xs text-[11px]">
                The simple workspace for discovering, building, and running AI agents and workflows.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-[#00F5D4] mb-3 uppercase tracking-wider text-[10px]">Product Suite</h3>
              <ul className="space-y-2.5 text-zinc-400">
                <li><Link to="/chat" className="hover:text-[#00F5D4] transition-colors">Chat & Models</Link></li>
                <li><Link to="/explore" className="hover:text-[#00F5D4] transition-colors">Explore Marketplace</Link></li>
                <li><Link to="/studio" className="hover:text-[#00F5D4] transition-colors">Workflow Studio</Link></li>
                <li><Link to="/cloud" className="hover:text-[#00F5D4] transition-colors">Nexus Cloud</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#FF007F] mb-3 uppercase tracking-wider text-[10px]">Management</h3>
              <ul className="space-y-2.5 text-zinc-400">
                <li><Link to="/payments" className="hover:text-[#FF007F] transition-colors">Payments & Vault</Link></li>
                <li><Link to="/activity" className="hover:text-[#FF007F] transition-colors">Activity & Receipts</Link></li>
                <li><Link to="/dashboard" className="hover:text-[#FF007F] transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#A855F7] mb-3 uppercase tracking-wider text-[10px]">Developers</h3>
              <ul className="space-y-2.5 text-zinc-400">
                <li><Link to="/developer" className="hover:text-[#A855F7] transition-colors">Dev Console</Link></li>
                <li><Link to="/docs" className="hover:text-[#A855F7] transition-colors">Documentation</Link></li>
                <li><Link to="/integrations" className="hover:text-[#A855F7] transition-colors">Integrations</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#FFD700] mb-3 uppercase tracking-wider text-[10px]">Trust & Legal</h3>
              <ul className="space-y-2.5 text-zinc-400">
                <li><Link to="/trust" className="hover:text-[#FFD700] transition-colors">Trust Center</Link></li>
                <li><Link to="/legal" className="hover:text-[#FFD700] transition-colors">Terms & Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/[0.06] pt-8 text-xs text-zinc-500">
            <p>© {new Date().getFullYear()} Nexus Cyber Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
