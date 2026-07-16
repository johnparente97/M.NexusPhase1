import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import MobileNav from './MobileNav';
import Footer from './Footer';
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
        setShowPalette(prev => !prev);
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
      <div className="min-h-screen bg-zinc-950 flex flex-col antialiased pb-16 md:pb-0">
        {/* Desktop Top Header Navigation */}
        <TopNav onSearchClick={() => setShowPalette(true)} />

        {/* Main Content Layout */}
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>

        {/* Responsive Footer */}
        <Footer />

        {/* Mobile Bottom Navigation Menu */}
        <MobileNav />

        {/* Global Floating AI Helper and Search Panels */}
        <AiCopilot />
        <CommandPalette isOpen={showPalette} onClose={() => setShowPalette(false)} />
      </div>
    </ToastProvider>
  );
}
