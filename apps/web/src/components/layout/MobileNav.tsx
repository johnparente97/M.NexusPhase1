import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Compass, Layers, History, LayoutDashboard, Sparkles, UserCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export default function MobileNav() {
  const { isSignedIn, signInAsDemo } = useAuth();
  const navigate = useNavigate();

  const authedItems = [
    { to: '/exchange', icon: Compass, label: 'Exchange' },
    { to: '/studio', icon: Layers, label: 'Studio' },
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/activity', icon: History, label: 'Activity' },
  ];

  const guestItems = [
    { to: '/exchange', icon: Compass, label: 'Exchange' },
    { to: '/chat/free', icon: Sparkles, label: 'Dolphin' },
    { to: '/marketplace/models', icon: Layers, label: 'Models' },
  ];

  const items = isSignedIn ? authedItems : guestItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-pb">
      {/* MRDN-style floating bottom pill nav */}
      <div className="bg-[#171719]/95 backdrop-blur-xl border-t border-zinc-800/60 px-2 pb-safe">
        <div className="flex items-center justify-around h-16">
          {items.map(({ to, icon: Icon, label }) => (
            <motion.div key={to} whileTap={{ scale: 0.88 }} className="flex-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl transition-all w-full',
                    isActive
                      ? 'text-emerald-400'
                      : 'text-zinc-500 hover:text-zinc-300'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={cn(
                      'p-1.5 rounded-xl transition-all duration-200',
                      isActive ? 'bg-emerald-500/10' : 'bg-transparent'
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={cn(
                      'text-[9px] font-semibold tracking-wide transition-colors',
                      isActive ? 'text-emerald-400' : 'text-zinc-500'
                    )}>
                      {label}
                    </span>
                    {/* Active dot indicator */}
                    {isActive && (
                      <div className="h-1 w-1 rounded-full bg-emerald-400 mt-0.5" />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          ))}

          {/* Sign in / Profile button */}
          {isSignedIn ? (
            <motion.div whileTap={{ scale: 0.88 }} className="flex-1">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl transition-all w-full',
                    isActive ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={cn(
                      'p-1.5 rounded-xl transition-all duration-200',
                      isActive ? 'bg-emerald-500/10' : 'bg-transparent'
                    )}>
                      <UserCircle2 className="h-5 w-5" />
                    </div>
                    <span className={cn(
                      'text-[9px] font-semibold tracking-wide',
                      isActive ? 'text-emerald-400' : 'text-zinc-500'
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
                className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl w-full text-zinc-500 hover:text-emerald-400 transition-all"
              >
                <div className="p-1.5 rounded-xl bg-emerald-500/10">
                  <UserCircle2 className="h-5 w-5 text-emerald-400" />
                </div>
                <span className="text-[9px] font-semibold tracking-wide text-emerald-400">Sign In</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
}
