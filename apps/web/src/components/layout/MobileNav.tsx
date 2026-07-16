import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Compass, Layers, History, LayoutDashboard, User } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export default function MobileNav() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-900 md:hidden h-16 flex items-center justify-around px-4">
      <motion.div whileTap={{ scale: 0.9 }}>
        <NavLink
          to="/exchange"
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400',
              { 'text-[#27F293] font-bold': isActive }
            )
          }
        >
          <Compass className="h-5 w-5" />
          Exchange
        </NavLink>
      </motion.div>

      {isSignedIn ? (
        <>
          <motion.div whileTap={{ scale: 0.9 }}>
            <NavLink
              to="/studio"
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400',
                  { 'text-[#27F293] font-bold': isActive }
                )
              }
            >
              <Layers className="h-5 w-5" />
              Studio
            </NavLink>
          </motion.div>
          
          <motion.div whileTap={{ scale: 0.9 }}>
            <NavLink
              to="/activity"
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400',
                  { 'text-[#27F293] font-bold': isActive }
                )
              }
            >
              <History className="h-5 w-5" />
              Activity
            </NavLink>
          </motion.div>

          <motion.div whileTap={{ scale: 0.9 }}>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400',
                  { 'text-[#27F293] font-bold': isActive }
                )
              }
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </NavLink>
          </motion.div>
        </>
      ) : (
        <motion.div whileTap={{ scale: 0.9 }}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400',
                { 'text-[#27F293] font-bold': isActive }
              )
            }
          >
            <User className="h-5 w-5" />
            Log In
          </NavLink>
        </motion.div>
      )}
    </nav>
  );
}
