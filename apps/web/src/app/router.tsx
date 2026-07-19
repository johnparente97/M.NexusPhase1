import { createHashRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppShell from '../components/layout/AppShell';
import LoadingPage from '../components/common/LoadingPage';
import PageTransition from '../components/common/PageTransition';

// Standard resilient chunk loader to catch bundle hash updates and reload the client
const lazyWithRetry = (componentImport: () => Promise<any>) => {
  return lazy(async () => {
    const hasRetried = window.sessionStorage.getItem('retry-lazy-load');
    try {
      const component = await componentImport();
      window.sessionStorage.removeItem('retry-lazy-load');
      return component;
    } catch (error) {
      if (!hasRetried) {
        window.sessionStorage.setItem('retry-lazy-load', 'true');
        console.warn("Failed to load chunk asset. Performing hard reload...");
        window.location.reload();
      }
      throw error;
    }
  });
};

// Lazy load all pages using the resilient chunk loader
const Landing = lazyWithRetry(() => import('../pages/Landing'));
const Exchange = lazyWithRetry(() => import('../pages/Exchange'));
const WorkflowDetail = lazyWithRetry(() => import('../pages/WorkflowDetail'));
const WorkflowRunner = lazyWithRetry(() => import('../pages/WorkflowRunner'));
const Studio = lazyWithRetry(() => import('../pages/Studio'));
const StudioEditor = lazyWithRetry(() => import('../pages/StudioEditor'));
const Dashboard = lazyWithRetry(() => import('../pages/Dashboard'));
const Activity = lazyWithRetry(() => import('../pages/Activity'));
const RunDetail = lazyWithRetry(() => import('../pages/RunDetail'));
const CreatorDashboard = lazyWithRetry(() => import('../pages/CreatorDashboard'));
const Profile = lazyWithRetry(() => import('../pages/Profile'));
const SavedWorkflows = lazyWithRetry(() => import('../pages/SavedWorkflows'));
const DolphinChat = lazyWithRetry(() => import('../pages/DolphinChat'));
const PaidChat = lazyWithRetry(() => import('../pages/PaidChat'));
const ModelMarketplace = lazyWithRetry(() => import('../pages/ModelMarketplace'));
const UnifiedBalancePage = lazyWithRetry(() => import('../pages/UnifiedBalancePage'));
const AgentBuilder = lazyWithRetry(() => import('../pages/AgentBuilder'));
const OrgDashboard = lazyWithRetry(() => import('../pages/OrgDashboard'));
const DevConsole = lazyWithRetry(() => import('../pages/DevConsole'));
const DocsPage = lazyWithRetry(() => import('../pages/DocsPage'));
const NotFoundPage = lazyWithRetry(() => import('../pages/NotFoundPage'));

const suspenseWrapper = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingPage />}>
    <PageTransition>
      <Component />
    </PageTransition>
  </Suspense>
);

export const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { path: '', element: suspenseWrapper(Landing) },
      { path: 'exchange', element: suspenseWrapper(Exchange) },
      { path: 'exchange/:id', element: suspenseWrapper(WorkflowDetail) },
      { path: 'exchange/:id/run', element: suspenseWrapper(WorkflowRunner) },
      { path: 'studio', element: suspenseWrapper(Studio) },
      { path: 'studio/new', element: suspenseWrapper(StudioEditor) },
      { path: 'studio/:id/edit', element: suspenseWrapper(StudioEditor) },
      { path: 'dashboard', element: suspenseWrapper(Dashboard) },
      { path: 'activity', element: suspenseWrapper(Activity) },
      { path: 'activity/:id', element: suspenseWrapper(RunDetail) },
      { path: 'creator', element: suspenseWrapper(CreatorDashboard) },
      { path: 'profile', element: suspenseWrapper(Profile) },
      { path: 'saved', element: suspenseWrapper(SavedWorkflows) },
      
      // New Capabilities Routes
      { path: 'chat/free', element: suspenseWrapper(DolphinChat) },
      { path: 'chat/paid', element: suspenseWrapper(PaidChat) },
      { path: 'marketplace/models', element: suspenseWrapper(ModelMarketplace) },
      { path: 'balance', element: suspenseWrapper(UnifiedBalancePage) },
      { path: 'agents/new', element: suspenseWrapper(AgentBuilder) },
      { path: 'organization', element: suspenseWrapper(OrgDashboard) },
      { path: 'developer', element: suspenseWrapper(DevConsole) },
      { path: 'docs', element: suspenseWrapper(DocsPage) },

      { path: '*', element: suspenseWrapper(NotFoundPage) },
    ],
  },
]);
