import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import MobileNav from './MobileNav';
import Footer from './Footer';
import { ToastProvider } from '../ui/Toast';
import { useAuth } from '../../hooks/useAuth';
import LoadingPage from '../common/LoadingPage';

export default function AppShell() {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <LoadingPage />;
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-zinc-950 flex flex-col antialiased pb-16 md:pb-0">
        {/* Desktop Top Header Navigation */}
        <TopNav />

        {/* Main Content Layout */}
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>

        {/* Responsive Footer */}
        <Footer />

        {/* Mobile Bottom Navigation Menu */}
        <MobileNav />
      </div>
    </ToastProvider>
  );
}
