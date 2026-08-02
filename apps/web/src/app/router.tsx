import { createHashRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import PublicLayout from '../components/layout/PublicLayout';
import WorkspaceLayout from '../components/layout/WorkspaceLayout';
import LoadingPage from '../components/common/LoadingPage';
import PageTransition from '../components/common/PageTransition';

// Resilient chunk loader to recover gracefully from deployment asset updates
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
        console.warn('Failed to load chunk asset. Performing hard reload...');
        window.location.reload();
      }
      throw error;
    }
  });
};

// Lazy loaded page components
const Landing = lazyWithRetry(() => import('../pages/Landing'));
const ExplorePage = lazyWithRetry(() => import('../pages/ExplorePage'));
const ComposePage = lazyWithRetry(() => import('../pages/ComposePage'));
const OperateCenter = lazyWithRetry(() => import('../pages/OperateCenter'));
const EarnGovernPage = lazyWithRetry(() => import('../pages/EarnGovernPage'));

const NexusCloudPage = lazyWithRetry(() => import('../pages/NexusCloudPage'));
const WorkflowDetail = lazyWithRetry(() => import('../pages/WorkflowDetail'));
const WorkflowRunner = lazyWithRetry(() => import('../pages/WorkflowRunner'));
const Studio = lazyWithRetry(() => import('../pages/Studio'));
const StudioEditor = lazyWithRetry(() => import('../pages/StudioEditor'));
const Dashboard = lazyWithRetry(() => import('../pages/Dashboard'));
const Activity = lazyWithRetry(() => import('../pages/Activity'));
const LibraryPage = lazyWithRetry(() => import('../pages/LibraryPage'));
const RunDetail = lazyWithRetry(() => import('../pages/RunDetail'));
const CreatorDashboard = lazyWithRetry(() => import('../pages/CreatorDashboard'));
const Profile = lazyWithRetry(() => import('../pages/Profile'));
const SavedWorkflows = lazyWithRetry(() => import('../pages/SavedWorkflows'));
const PaidChat = lazyWithRetry(() => import('../pages/PaidChat'));
const UnifiedBalancePage = lazyWithRetry(() => import('../pages/UnifiedBalancePage'));
const AgentBuilder = lazyWithRetry(() => import('../pages/AgentBuilder'));
const OrgDashboard = lazyWithRetry(() => import('../pages/OrgDashboard'));
const DevConsole = lazyWithRetry(() => import('../pages/DevConsole'));
const DocsPage = lazyWithRetry(() => import('../pages/DocsPage'));
const TrustCenter = lazyWithRetry(() => import('../pages/TrustCenter'));
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
    element: <PublicLayout />,
    children: [
      { path: '', element: suspenseWrapper(Landing) },
      { path: 'suite', element: suspenseWrapper(ExplorePage) },
      { path: 'integrations', element: <Navigate to="/trust" replace /> },
      { path: 'trust', element: suspenseWrapper(TrustCenter) },
      { path: 'developers', element: suspenseWrapper(DevConsole) },
      { path: 'docs', element: suspenseWrapper(DocsPage) },
      { path: 'legal', element: suspenseWrapper(TrustCenter) },
      { path: 'about', element: suspenseWrapper(Landing) },
      { path: 'terms', element: suspenseWrapper(TrustCenter) },
      { path: 'privacy', element: suspenseWrapper(TrustCenter) },
    ],
  },
  {
    path: '/',
    element: <WorkspaceLayout />,
    children: [
      // Compatibility redirects & decommissioned page aliases
      { path: 'exchange', element: <Navigate to="/explore" replace /> },
      { path: 'defi', element: <Navigate to="/payments" replace /> },
      { path: 'storage', element: <Navigate to="/explore?category=Storage" replace /> },
      { path: 'compute', element: <Navigate to="/explore?category=Compute" replace /> },
      { path: 'alignment', element: <Navigate to="/trust" replace /> },
      { path: 'ecosystem', element: <Navigate to="/trust" replace /> },
      { path: 'network', element: <Navigate to="/payments" replace /> },
      { path: 'balance', element: <Navigate to="/payments" replace /> },
      
      // 5 Principal Consolidated Destinations
      { path: 'explore', element: suspenseWrapper(ExplorePage) },
      { path: 'compose', element: suspenseWrapper(ComposePage) },
      { path: 'build', element: suspenseWrapper(ComposePage) },
      { path: 'activity', element: suspenseWrapper(Activity) },
      { path: 'library', element: suspenseWrapper(LibraryPage) },
      { path: 'dashboard', element: suspenseWrapper(Dashboard) },
      { path: 'workspace', element: suspenseWrapper(Dashboard) },

      // Sub-Surface Routes & Workflow Execution
      { path: 'chat', element: suspenseWrapper(PaidChat) },
      { path: 'chat/free', element: suspenseWrapper(PaidChat) },
      { path: 'chat/paid', element: suspenseWrapper(PaidChat) },
      
      { path: 'workflows', element: suspenseWrapper(ExplorePage) },
      { path: 'workflows/:id', element: suspenseWrapper(WorkflowDetail) },
      { path: 'workflows/:id/run', element: suspenseWrapper(WorkflowRunner) },
      
      { path: 'studio', element: suspenseWrapper(Studio) },
      { path: 'studio/new', element: suspenseWrapper(StudioEditor) },
      { path: 'studio/:id/edit', element: suspenseWrapper(StudioEditor) },
      
      { path: 'agents', element: suspenseWrapper(ExplorePage) },
      { path: 'agents/new', element: suspenseWrapper(AgentBuilder) },
      
      { path: 'cloud', element: suspenseWrapper(NexusCloudPage) },
      { path: 'data', element: suspenseWrapper(NexusCloudPage) },
      { path: 'payments', element: suspenseWrapper(UnifiedBalancePage) },
      
      { path: 'activity/:id', element: suspenseWrapper(RunDetail) },
      
      { path: 'teams', element: suspenseWrapper(OrgDashboard) },
      { path: 'organization', element: suspenseWrapper(OrgDashboard) },
      { path: 'creator', element: suspenseWrapper(CreatorDashboard) },
      { path: 'provide', element: suspenseWrapper(CreatorDashboard) },
      { path: 'developer', element: suspenseWrapper(DevConsole) },
      { path: 'settings', element: suspenseWrapper(Profile) },
      { path: 'profile', element: suspenseWrapper(Profile) },
      { path: 'saved', element: suspenseWrapper(SavedWorkflows) },

      // Fallback
      { path: '*', element: suspenseWrapper(NotFoundPage) },
    ],
  },
]);
