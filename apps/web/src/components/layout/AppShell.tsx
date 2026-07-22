import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import MobileNav from './MobileNav';
import MobileNavDrawer from './MobileNavDrawer';
import Footer from './Footer';
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
      <div className="min-h-screen bg-zinc-950 flex flex-col antialiased selection:bg-emerald-400/30 selection:text-white">
        
        {/* Single Authoritative Top Navigation Header (No Side Menu Collision!) */}
        <TopNav
          onSearchClick={() => setShowPalette(true)}
          onMobileMenuClick={() => setIsMobileDrawerOpen(true)}
        />

        {/* Mobile Slide-Out Drawer */}
        <MobileNavDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
        />

        {/* 100% Full Width Primary Workspace Canvas */}
        <main className="flex-1 flex flex-col min-w-0 pt-16 pb-16 md:pb-8 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <Outlet />
        </main>

        {/* Context Inspector Overlay Panel (Auto-hidden drawer) */}
        <WorkspaceInspector />

        {/* Footer */}
        <Footer />

        {/* Mobile Bottom Navigation Bar */}
        <MobileNav />

        {/* Floating Intelligence Assistant & Spotlight Search */}
        <AiCopilot />
        <CommandPalette isOpen={showPalette} onClose={() => setShowPalette(false)} />
      </div>
    </ToastProvider>
  );
}
