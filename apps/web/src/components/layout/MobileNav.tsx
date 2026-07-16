import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Compass, Layers, History, LayoutDashboard, User } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function MobileNav() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-900 md:hidden h-16 flex items-center justify-around px-4">
      <NavLink
        to="/exchange"
        className={({ isActive }) =>
          cn(
            'flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400',
            { 'text-indigo-400 font-bold': isActive }
          )
        }
      >
        <Compass className="h-5 w-5" />
        Exchange
      </NavLink>

      {isSignedIn ? (
        <>
          <NavLink
            to="/studio"
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400',
                { 'text-indigo-400 font-bold': isActive }
              )
            }
          >
            <Layers className="h-5 w-5" />
            Studio
          </NavLink>
          <NavLink
            to="/activity"
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400',
                { 'text-indigo-400 font-bold': isActive }
              )
            }
          >
            <History className="h-5 w-5" />
            Activity
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400',
                { 'text-indigo-400 font-bold': isActive }
              )
            }
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </NavLink>
        </>
      ) : (
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center gap-1 text-[10px] font-semibold text-zinc-400',
              { 'text-indigo-400 font-bold': isActive }
            )
          }
        >
          <User className="h-5 w-5" />
          Log In
        </NavLink>
      )}
    </nav>
  );
}
