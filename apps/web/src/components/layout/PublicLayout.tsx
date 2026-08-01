import { Outlet, Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Network } from 'lucide-react'; // Placeholder for NexusLogoMark

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col antialiased selection:bg-emerald-400/30 selection:text-white">
      {/* Minimalist Top Header Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20">
                <Network className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">Nexus</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
              <Link to="/explore" className="transition-colors hover:text-white">Explore</Link>
              <Link to="/suite" className="transition-colors hover:text-white">Suite</Link>
              <Link to="/developers" className="transition-colors hover:text-white">Developers</Link>
              <Link to="/integrations" className="transition-colors hover:text-white">Integrations</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/chat" 
              className="hidden sm:block text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              Sign In
            </Link>
            <Link 
              to="/chat" 
              className="inline-flex h-9 items-center justify-center rounded-xl bg-emerald-500 px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              Open Nexus
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>

      {/* Restrained Public Footer */}
      <footer className="border-t border-white/5 bg-zinc-950 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-7 mb-12 text-sm">
            <div className="col-span-2 lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20">
                  <Network className="h-4 w-4" />
                </div>
                <span className="font-semibold text-white">Nexus</span>
              </Link>
              <p className="text-zinc-500 max-w-xs">
                The decentralized intelligence network and compute platform.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Nexus</h3>
              <ul className="space-y-3 text-zinc-400">
                <li><Link to="/explore" className="hover:text-emerald-400">Explore</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3 text-zinc-400">
                <li><Link to="/suite" className="hover:text-emerald-400">Suite</Link></li>
                <li><Link to="/chat" className="hover:text-emerald-400">Chat</Link></li>
                <li><Link to="/workflows" className="hover:text-emerald-400">Workflows</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Developers</h3>
              <ul className="space-y-3 text-zinc-400">
                <li><Link to="/docs" className="hover:text-emerald-400">Documentation</Link></li>
                <li><Link to="/developer" className="hover:text-emerald-400">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Providers</h3>
              <ul className="space-y-3 text-zinc-400">
                <li><Link to="/provide" className="hover:text-emerald-400">Become a Provider</Link></li>
                <li><Link to="/compute" className="hover:text-emerald-400">Compute</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3 text-zinc-400">
                <li><Link to="/trust" className="hover:text-emerald-400">Trust Center</Link></li>
                <li><Link to="/legal" className="hover:text-emerald-400">Terms & Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} Nexus Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
