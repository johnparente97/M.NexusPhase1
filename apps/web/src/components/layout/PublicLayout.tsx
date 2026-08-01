import { Outlet, Link } from 'react-router-dom';
import { NexusLogoMark } from '../common/NexusLogoMark';
import { Button } from '../ui/Button';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#08080C] text-[#F3F3F7] flex flex-col antialiased selection:bg-violet-500/30 selection:text-white">
      {/* Minimalist Top Header Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#08080C]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600/15 ring-1 ring-violet-500/30">
                <NexusLogoMark className="h-5 w-5 text-violet-400" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight text-white">Nexus</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-400">
              <Link to="/explore" className="transition-colors hover:text-violet-300">Explore</Link>
              <Link to="/integrations" className="transition-colors hover:text-violet-300">Integrations</Link>
              <Link to="/developer" className="transition-colors hover:text-violet-300">Developers</Link>
              <Link to="/trust" className="transition-colors hover:text-violet-300">Trust & Legal</Link>
              <Link to="/docs" className="transition-colors hover:text-violet-300">Documentation</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
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
              className="font-semibold shadow-md shadow-violet-600/20"
            >
              Open Nexus
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>

      {/* Restrained Public Footer */}
      <footer className="border-t border-white/[0.06] bg-[#0E0E14] pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6 mb-12 text-xs">
            <div className="col-span-2 lg:col-span-2 space-y-3">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600/15 ring-1 ring-violet-500/30">
                  <NexusLogoMark className="h-4 w-4 text-violet-400" />
                </div>
                <span className="font-display font-bold text-base text-white">Nexus</span>
              </Link>
              <p className="text-zinc-400 leading-relaxed max-w-xs">
                The independent workspace and distribution platform for intelligent digital capabilities.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-3 uppercase tracking-wider text-[10px]">Product Suite</h3>
              <ul className="space-y-2.5 text-zinc-400">
                <li><Link to="/chat" className="hover:text-violet-300 transition-colors">Chat & Models</Link></li>
                <li><Link to="/explore" className="hover:text-violet-300 transition-colors">Explore Marketplace</Link></li>
                <li><Link to="/studio" className="hover:text-violet-300 transition-colors">Workflow Studio</Link></li>
                <li><Link to="/cloud" className="hover:text-violet-300 transition-colors">Nexus Cloud</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3 uppercase tracking-wider text-[10px]">Management</h3>
              <ul className="space-y-2.5 text-zinc-400">
                <li><Link to="/payments" className="hover:text-violet-300 transition-colors">Payments & Vault</Link></li>
                <li><Link to="/activity" className="hover:text-violet-300 transition-colors">Activity & Receipts</Link></li>
                <li><Link to="/dashboard" className="hover:text-violet-300 transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3 uppercase tracking-wider text-[10px]">Developers</h3>
              <ul className="space-y-2.5 text-zinc-400">
                <li><Link to="/developer" className="hover:text-violet-300 transition-colors">Dev Console</Link></li>
                <li><Link to="/docs" className="hover:text-violet-300 transition-colors">Documentation</Link></li>
                <li><Link to="/integrations" className="hover:text-violet-300 transition-colors">Integrations</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3 uppercase tracking-wider text-[10px]">Trust & Legal</h3>
              <ul className="space-y-2.5 text-zinc-400">
                <li><Link to="/trust" className="hover:text-violet-300 transition-colors">Trust Center</Link></li>
                <li><Link to="/legal" className="hover:text-violet-300 transition-colors">Terms & Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/[0.05] pt-8 text-xs text-zinc-500">
            <p>© {new Date().getFullYear()} Nexus Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
