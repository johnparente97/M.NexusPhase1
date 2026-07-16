import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { UserButton } from '@clerk/clerk-react';
import { Compass, BookOpen, Layers, History, Settings, Award } from 'lucide-react';
import { cn } from '../../utils/cn';
import DemoLabel from '../common/DemoLabel';

export default function TopNav() {
  const { isSignedIn, user, signOut, signInAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = (role: 'user' | 'creator' | 'admin') => {
    signInAsDemo(role);
    navigate('/dashboard');
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <svg className="h-6 w-6 text-indigo-500" viewBox="0 0 100 100" fill="none">
              <rect width="100" height="100" rx="22" fill="#09090b" />
              <path d="M 30,30 L 30,70 L 42,70 L 42,48 L 58,70 L 70,70 L 70,30 L 58,30 L 58,52 L 42,30 Z" fill="currentColor" />
            </svg>
            <span className="font-display font-bold text-base tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Meridian Nexus
            </span>
          </Link>
          <DemoLabel />
        </div>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-6">
          <NavLink
            to="/exchange"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors',
                { 'text-indigo-400 font-bold': isActive }
              )
            }
          >
            <Compass className="h-4 w-4" />
            Exchange
          </NavLink>
          {isSignedIn && (
            <>
              <NavLink
                to="/studio"
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors',
                    { 'text-indigo-400 font-bold': isActive }
                  )
                }
              >
                <Layers className="h-4 w-4" />
                Studio
              </NavLink>
              <NavLink
                to="/activity"
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors',
                    { 'text-indigo-400 font-bold': isActive }
                  )
                }
              >
                <History className="h-4 w-4" />
                Activity
              </NavLink>
              {user?.role === 'creator' && (
                <NavLink
                  to="/creator"
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors',
                      { 'text-indigo-400 font-bold': isActive }
                    )
                  }
                >
                  <Award className="h-4 w-4" />
                  Creator Portal
                </NavLink>
              )}
            </>
          )}
        </nav>

        {/* Right Auth controls */}
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-xs font-semibold text-zinc-300 hover:text-zinc-100">
                Dashboard
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut} className="text-zinc-400 hover:text-zinc-100">
                Log Out
              </Button>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Quick Demo Logins per Role */}
              <button
                onClick={() => handleDemoLogin('user')}
                className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-700 px-2 py-1 rounded"
              >
                User Demo
              </button>
              <button
                onClick={() => handleDemoLogin('creator')}
                className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-700 px-2 py-1 rounded"
              >
                Creator Demo
              </button>
              <Link to="/exchange">
                <Button variant="primary" size="sm">
                  Explore Workflows
                </Button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
