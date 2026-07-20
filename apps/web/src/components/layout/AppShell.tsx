import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import MobileNav from './MobileNav';
import Footer from './Footer';
import MissionControlSidebar from './MissionControlSidebar';
import WorkspaceInspector from './WorkspaceInspector';
import FloatingDock from './FloatingDock';
import { ToastProvider } from '../ui/Toast';
import { useAuth } from '../../hooks/useAuth';
import LoadingPage from '../common/LoadingPage';
import CommandPalette from '../common/CommandPalette';
import AiCopilot from '../common/AiCopilot';

export default function AppShell() {
  const { isLoaded } = useAuth();
  const [showPalette, setShowPalette] = useState(false);

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
        {/* Top Header Navigation */}
        <TopNav onSearchClick={() => setShowPalette(true)} />

        {/* Integrated 3-Pane AI OS Workspace Layout */}
        <div className="flex-1 flex w-full relative">
          {/* 1. Left Mission Control Sidebar */}
          <MissionControlSidebar onSearchClick={() => setShowPalette(true)} />

          {/* 2. Primary Center Workspace View - md:pt-24 accounts for fixed floating TopNav (desktop only) */}
          <main className="flex-1 flex flex-col min-w-0 md:pt-24 pb-20">
            <Outlet />
          </main>

          {/* 3. Right Context Inspector Panel */}
          <WorkspaceInspector />
        </div>

        {/* Footer */}
        <Footer />

        {/* macOS / VisionOS Style Floating Dock */}
        <FloatingDock onSearchClick={() => setShowPalette(true)} />

        {/* Mobile Navigation */}
        <MobileNav />

        {/* Floating Intelligence Assistant & Spotlight Search */}
        <AiCopilot />
        <CommandPalette isOpen={showPalette} onClose={() => setShowPalette(false)} />
      </div>
    </ToastProvider>
  );
}
