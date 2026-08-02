import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Compass, Terminal, Activity as ActivityIcon, Home, Menu, Folder } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MobileNavProps {
  onOpenMenu?: () => void;
}

export default function MobileNav({ onOpenMenu }: MobileNavProps) {
  const { isSignedIn } = useAuth();

  const items = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/explore', icon: Compass, label: 'Explore' },
    { to: '/compose', icon: Terminal, label: 'Build' },
    { to: '/activity', icon: ActivityIcon, label: 'Activity' },
    { to: '/library', icon: Folder, label: 'Library' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-layer-header lg:hidden select-none">
      {/* Sleek iOS Glassmorphism Floating Pill Bottom Bar */}
      <div className="bg-[#121214]/95 backdrop-blur-2xl border-t border-zinc-800/80 px-2 pt-1.5 pb-[calc(env(safe-area-inset-bottom,8px)+4px)] shadow-2xl">
        <div className="flex items-center justify-around h-14 max-w-md mx-auto">
          {items.map(({ to, icon: Icon, label }) => (
            <div key={to} className="flex-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl transition-all w-full cursor-pointer',
                    isActive
                      ? 'text-violet-400 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={cn(
                      'p-1.5 rounded-xl transition-all duration-200',
                      isActive ? 'bg-violet-500/15 text-violet-400 border border-violet-500/30' : 'bg-transparent'
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className={cn(
                      'text-[10px] tracking-tight transition-colors leading-none',
                      isActive ? 'text-violet-400 font-bold' : 'text-zinc-500'
                    )}>
                      {label}
                    </span>
                    {isActive && (
                      <div className="h-1 w-1 rounded-full bg-violet-400 mt-0.5" />
                    )}
                  </>
                )}
              </NavLink>
            </div>
          ))}

          {/* More Action */}
          <div className="flex-1">
            <button
              onClick={() => {
                if (onOpenMenu) onOpenMenu();
                else document.dispatchEvent(new CustomEvent('open-mobile-menu'));
              }}
              className="flex flex-col items-center justify-center gap-0.5 py-1 rounded-xl w-full text-zinc-500 hover:text-emerald-400 transition-all cursor-pointer"
            >
              <div className="p-1.5 rounded-xl bg-transparent">
                <Menu className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-semibold tracking-tight text-zinc-500 leading-none">More</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
