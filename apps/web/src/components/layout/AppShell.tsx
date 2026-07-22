import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import MobileNav from './MobileNav';
import MobileNavDrawer from './MobileNavDrawer';
import Footer from './Footer';
import MissionControlSidebar from './MissionControlSidebar';
import WorkspaceInspector from './WorkspaceInspector';
import { ToastProvider } from '../ui/Toast';
import { useAuth } from '../../hooks/useAuth';
import LoadingPage from '../common/LoadingPage';
import CommandPalette from '../common/CommandPalette';
import AiCopilot from '../common/AiCopilot';
import { useSidebarStore } from '../../stores/sidebar-store';
import { cn } from '../../utils/cn';

export default function AppShell() {
  const { isCollapsed } = useSidebarStore();
  const { isLoaded } = useAuth();
  const [showPalette, setShowPalette] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Setup global Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowPalette((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isLoaded) {
    return <LoadingPage />;
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-zinc-950 flex antialiased selection:bg-emerald-400/30 selection:text-white">
        
        {/* Full-Height Left Sidebar (OpenAI / Claude Style) */}
        <MissionControlSidebar onSearchClick={() => setShowPalette(true)} />

        {/* Workspace Container with Adaptive Padding for Sidebar Width */}
        <div
          className={cn(
            'flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-200 pl-0',
            {
              'lg:pl-64': !isCollapsed,
              'lg:pl-16': isCollapsed,
            }
          )}
        >
          {/* Adaptive Top Utilities Header */}
          <TopNav
            onSearchClick={() => setShowPalette(true)}
            onMobileMenuClick={() => setIsMobileDrawerOpen(true)}
          />

          {/* Main Canvas View (pt-14 accounts for h-14 TopNav) */}
          <main className="flex-1 flex flex-col min-w-0 pt-14 pb-16 md:pb-8 w-full max-w-7xl mx-auto px-3 sm:px-6">
            <Outlet />
          </main>

          {/* Context Inspector Overlay Panel (Auto-hidden drawer) */}
          <WorkspaceInspector />

          {/* Footer */}
          <Footer />
        </div>

        {/* Mobile Slide-Out Drawer & Mobile Bottom Nav */}
        <MobileNavDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
        />
        <MobileNav />

        {/* Floating Intelligence Assistant & Spotlight Search */}
        <AiCopilot />
        <CommandPalette isOpen={showPalette} onClose={() => setShowPalette(false)} />
      </div>
    </ToastProvider>
  );
}
