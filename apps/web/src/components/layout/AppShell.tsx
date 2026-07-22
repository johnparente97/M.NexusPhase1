import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [showPalette, setShowPalette] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const isChat = location.pathname.startsWith('/chat');

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
      <div className="min-h-screen bg-zinc-950 flex antialiased selection:bg-emerald-400/30 selection:text-white overflow-x-hidden">
        
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
          <main
            className={cn(
              'flex-1 flex flex-col min-w-0 pt-14 w-full max-w-7xl mx-auto px-2 sm:px-5',
              {
                'pb-0 h-[calc(100vh-3.5rem)] overflow-hidden': isChat,
                'pb-16 md:pb-8': !isChat,
              }
            )}
          >
            <Outlet />
          </main>

          {/* Context Inspector Overlay Panel */}
          <WorkspaceInspector />

          {/* Footer (Hidden on Chat workspace to maximize vertical space) */}
          {!isChat && <Footer />}
        </div>

        {/* Mobile Slide-Out Drawer & Mobile Bottom Nav */}
        <MobileNavDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
        />
        <MobileNav />

        {/* Floating Intelligence Assistant & Spotlight Search */}
        {!isChat && <AiCopilot />}
        <CommandPalette isOpen={showPalette} onClose={() => setShowPalette(false)} />
      </div>
    </ToastProvider>
  );
}
