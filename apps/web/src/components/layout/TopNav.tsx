import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { Compass, Layers, History, Award, LayoutDashboard, Search, Wallet, LogOut as LogOutIcon, Copy } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import DemoLabel from '../common/DemoLabel';
import { useWallet } from '../../hooks/useWallet';
import logoNexus from '../../assets/logo-nexus.png';
import { NexusLogoMark } from '../common/NexusLogoMark';

export interface TopNavProps {
  onSearchClick?: () => void;
}

export default function TopNav({ onSearchClick }: TopNavProps) {
  const { isSignedIn, user, signOut, signInAsDemo } = useAuth();
  const navigate = useNavigate();
  const { walletAddress, chainId, isConnected, isConnecting, usdcBalance, switchNetwork, signInWithEthereum, disconnectWallet } = useWallet();

  const handleDemoLogin = (role: 'user' | 'creator' | 'admin') => {
    signInAsDemo(role);
    navigate('/dashboard');
  };

  const navItemVariants = { hover: { y: -1, scale: 1.03 }, tap: { scale: 0.97 } };
  const isWrongNetwork = isConnected && chainId !== 84532;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 hidden md:block pointer-events-none">
      {/* MRDN floating pill nav — matches mrdn.finance bg-[#171719] rounded-2xl shadow */}
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="bg-[#171719] rounded-2xl shadow-lg shadow-black/30 border border-zinc-800/50 px-4 py-2">
          <div className="flex items-center justify-between gap-4">

            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <NexusLogoMark className="h-8 w-8 sm:h-9 sm:w-9 filter drop-shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
              </motion.div>
              <span className="font-display font-bold text-base text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                Meridian Nexus
              </span>
              <DemoLabel />
            </Link>

            {/* Center Nav — MRDN style font-medium text-gray-300 */}
            <nav className="hidden lg:flex items-center gap-5">
              {[
                { to: '/exchange', icon: Compass, label: 'Exchange' },
                ...(isSignedIn ? [
                  { to: '/studio', icon: Layers, label: 'Studio' },
                  { to: '/activity', icon: History, label: 'Activity' },
                  ...(user?.role === 'creator' ? [{ to: '/creator', icon: Award, label: 'Creator' }] : []),
                ] : []),
              ].map(({ to, icon: Icon, label }) => (
                <motion.div key={to} whileHover="hover" whileTap="tap" variants={navItemVariants}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-1.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'text-emerald-400 [text-shadow:0_0_8px_rgba(52,211,153,0.4)]'
                          : 'text-zinc-400 hover:text-white'
                      )
                    }
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </NavLink>
                </motion.div>
              ))}

              {/* Command Centre link — MRDN style with glow */}
              {isSignedIn && (
                <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-1.5 text-sm font-medium transition-colors',
                        isActive
                          ? 'text-emerald-400'
                          : 'text-white/90 hover:text-white'
                      )
                    }
                    style={{ textShadow: '0 0 6px rgba(52, 211, 153, 0.45), 0 0 14px rgba(52, 211, 153, 0.25)' }}
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Command Centre
                  </NavLink>
                </motion.div>
              )}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Search pill */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onSearchClick}
                className="hidden lg:flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 rounded-xl px-3 py-1.5 transition-colors cursor-pointer select-none"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Search...</span>
                <kbd className="text-[9px] text-zinc-600 bg-zinc-950 border border-zinc-800 px-1 py-0.5 rounded font-mono">⌘K</kbd>
              </motion.button>

              {/* Wallet Widget */}
              {isWrongNetwork ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={switchNetwork}
                  className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-full transition-colors cursor-pointer font-semibold"
                >
                  Switch to Base Sepolia
                </motion.button>
              ) : isConnected ? (
                <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-xl p-1.5 px-3">
                  <span className="text-xs font-semibold text-emerald-400">{usdcBalance} USDC</span>
                  <span className="text-zinc-700">|</span>
                  <button
                    onClick={() => { navigator.clipboard.writeText(walletAddress || ''); }}
                    className="text-xs font-mono text-zinc-300 hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Copy wallet address"
                  >
                    {walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : ''}
                    <Copy className="h-3 w-3 text-zinc-500" />
                  </button>
                  <button
                    onClick={disconnectWallet}
                    className="text-zinc-500 hover:text-red-400 p-0.5 hover:bg-zinc-800/40 rounded transition-colors cursor-pointer"
                  >
                    <LogOutIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                /* MRDN white pill primary CTA */
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={signInWithEthereum}
                  className="flex items-center gap-1.5 text-xs font-medium bg-white hover:bg-gray-100 text-zinc-950 px-4 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-all cursor-pointer"
                >
                  <Wallet className="h-3.5 w-3.5" />
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </motion.button>
              )}

              {/* Auth controls */}
              {isSignedIn ? (
                <div className="flex items-center gap-2 border-l border-zinc-800 pl-2">
                  <Link to="/profile" title="Profile">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-300 flex items-center justify-center text-[10px] font-bold text-zinc-950 cursor-pointer hover:opacity-90 transition-opacity">
                      {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={signOut} className="text-zinc-400 hover:text-zinc-100 text-xs">
                    Log Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 border-l border-zinc-800 pl-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDemoLogin('user')}
                    className="text-[10px] font-medium text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 px-2.5 py-1 rounded-full bg-zinc-900/40 hover:bg-zinc-900 transition-all duration-150 cursor-pointer"
                  >
                    User Demo
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDemoLogin('creator')}
                    className="text-[10px] font-medium text-zinc-400 hover:text-emerald-400 border border-zinc-800 hover:border-emerald-500/30 px-2.5 py-1 rounded-full bg-zinc-900/40 hover:bg-emerald-500/5 transition-all duration-150 cursor-pointer"
                  >
                    Creator Demo
                  </motion.button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
