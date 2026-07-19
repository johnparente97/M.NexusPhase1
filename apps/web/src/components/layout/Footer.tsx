import { Link } from 'react-router-dom';
import logoNexus from '../../assets/logo-nexus.png';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-12 pb-24 md:pb-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
        
        {/* Branding Info */}
        <div className="flex flex-col gap-3 max-w-xs">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoNexus} alt="Meridian Nexus" className="h-9 w-9 object-contain mix-blend-screen filter drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
            <span className="font-display font-bold text-base tracking-tight text-zinc-100">
              Meridian Nexus
            </span>
          </Link>
          <p className="text-[11px] text-zinc-500 leading-normal">
            Discover, configure, and execute trusted AI capabilities through one outcome-first interface. Powered by Meridian infrastructure.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Product</h4>
            <Link to="/exchange" className="text-xs text-zinc-500 hover:text-zinc-300">Exchange</Link>
            <Link to="/studio" className="text-xs text-zinc-500 hover:text-zinc-300">Nexus Studio</Link>
            <Link to="/dashboard" className="text-xs text-zinc-500 hover:text-zinc-300">Dashboard</Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">System</h4>
            <span className="text-xs text-zinc-500">Meridian Mpay</span>
            <span className="text-xs text-zinc-500">Command Centre</span>
            <span className="text-xs text-zinc-500">x402 Settlement</span>
          </div>
          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Legal</h4>
            <span className="text-xs text-zinc-500">Privacy Policy</span>
            <span className="text-xs text-zinc-500">Terms of Service</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="text-[10px] text-zinc-600">
          © {new Date().getFullYear()} Meridian Nexus. All rights reserved.
        </p>
        <p className="text-[10px] text-zinc-500 max-w-md leading-normal sm:text-right">
          <strong>Demonstration Disclosure</strong>: This platform operates in fallback demonstration mode. All transactions, credits, and metrics are simulated for evaluation purposes.
        </p>
      </div>
    </footer>
  );
}
