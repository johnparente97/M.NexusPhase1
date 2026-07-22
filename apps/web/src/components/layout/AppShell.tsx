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

export default function AppShell() {
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
      <div className="h-screen w-screen bg-zinc-950 flex overflow-hidden antialiased selection:bg-emerald-400/30 selection:text-white">
        
        {/* 1. Full-Height Left Sidebar (OpenAI / Claude Style) */}
        <MissionControlSidebar onSearchClick={() => setShowPalette(true)} />

        {/* 2. Primary Main Workspace View */}
        <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden relative">
          
          {/* Top Utilities Header inside Main Workspace */}
          <TopNav
            onSearchClick={() => setShowPalette(true)}
            onMobileMenuClick={() => setIsMobileDrawerOpen(true)}
          />

          {/* Center Main View Canvas */}
          <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative pb-16 md:pb-0">
            <Outlet />
          </main>

          {/* Context Inspector Overlay Panel */}
          <WorkspaceInspector />
        </div>

        {/* Mobile Slide-Out Drawer & Mobile Bottom Bar */}
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
