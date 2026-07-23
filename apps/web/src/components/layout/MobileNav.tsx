import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Compass, Layers, Coins, Sparkles, UserCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export default function MobileNav() {
  const { isSignedIn, signInAsDemo } = useAuth();
  const navigate = useNavigate();

  const authedItems = [
    { to: '/chat', icon: Sparkles, label: 'Chat' },
    { to: '/exchange', icon: Compass, label: 'Exchange' },
    { to: '/studio', icon: Layers, label: 'Studio' },
    { to: '/balance', icon: Coins, label: 'Balance' },
  ];

  const guestItems = [
    { to: '/chat', icon: Sparkles, label: 'Chat' },
    { to: '/exchange', icon: Compass, label: 'Exchange' },
    { to: '/marketplace/models', icon: Layers, label: 'Models' },
    { to: '/balance', icon: Coins, label: 'Balance' },
  ];

  const items = isSignedIn ? authedItems : guestItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-layer-header lg:hidden select-none">
      {/* Sleek iOS Glassmorphism Floating Pill Bottom Bar */}
      <div className="bg-[#121214]/95 backdrop-blur-2xl border-t border-zinc-800/80 px-2 pt-1.5 pb-[calc(env(safe-area-inset-bottom,8px)+4px)] shadow-2xl">
        <div className="flex items-center justify-around h-14 max-w-md mx-auto">
          {items.map(({ to, icon: Icon, label }) => (
            <motion.div key={to} whileTap={{ scale: 0.88 }} className="flex-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition-all w-full cursor-pointer',
                    isActive
                      ? 'text-emerald-400 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={cn(
                      'p-1.5 rounded-xl transition-all duration-200',
                      isActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-transparent'
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={cn(
                      'text-[10px] tracking-tight transition-colors leading-none',
                      isActive ? 'text-emerald-400 font-bold' : 'text-zinc-500'
                    )}>
                      {label}
                    </span>
                    {isActive && (
                      <div className="h-1 w-1 rounded-full bg-emerald-400 mt-0.5" />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}

          {/* Profile / Demo Sign In Action (Uniform glassmorphic design) */}
          {isSignedIn ? (
            <motion.div whileTap={{ scale: 0.88 }} className="flex-1">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition-all w-full cursor-pointer',
                    isActive ? 'text-emerald-400 font-semibold' : 'text-zinc-500 hover:text-zinc-300'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={cn(
                      'p-1.5 rounded-xl transition-all duration-200',
                      isActive ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-transparent'
                    )}>
                      <UserCircle2 className="h-5 w-5" />
                    </div>
                    <span className={cn(
                      'text-[10px] tracking-tight leading-none',
                      isActive ? 'text-emerald-400 font-bold' : 'text-zinc-500'
                    )}>
                      Profile
                    </span>
                    {isActive && <div className="h-1 w-1 rounded-full bg-emerald-400 mt-0.5" />}
                  </>
                )}
              </NavLink>
            </motion.div>
          ) : (
            <motion.div whileTap={{ scale: 0.88 }} className="flex-1">
              <button
                onClick={() => { signInAsDemo('user'); navigate('/dashboard'); }}
                className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl w-full text-zinc-500 hover:text-emerald-400 transition-all cursor-pointer"
              >
                <div className="p-1.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <UserCircle2 className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-semibold tracking-tight text-emerald-400 leading-none">Sign In</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
}
