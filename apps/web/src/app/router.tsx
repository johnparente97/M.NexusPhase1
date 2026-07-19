import { createHashRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppShell from '../components/layout/AppShell';
import LoadingPage from '../components/common/LoadingPage';

// Lazy load all pages for code-splitting performance
const Landing = lazy(() => import('../pages/Landing'));
const Exchange = lazy(() => import('../pages/Exchange'));
const WorkflowDetail = lazy(() => import('../pages/WorkflowDetail'));
const WorkflowRunner = lazy(() => import('../pages/WorkflowRunner'));
const Studio = lazy(() => import('../pages/Studio'));
const StudioEditor = lazy(() => import('../pages/StudioEditor'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Activity = lazy(() => import('../pages/Activity'));
const RunDetail = lazy(() => import('../pages/RunDetail'));
const CreatorDashboard = lazy(() => import('../pages/CreatorDashboard'));
const Profile = lazy(() => import('../pages/Profile'));
const SavedWorkflows = lazy(() => import('../pages/SavedWorkflows'));
const DolphinChat = lazy(() => import('../pages/DolphinChat'));
const PaidChat = lazy(() => import('../pages/PaidChat'));
const ModelMarketplace = lazy(() => import('../pages/ModelMarketplace'));
const UnifiedBalancePage = lazy(() => import('../pages/UnifiedBalancePage'));
const AgentBuilder = lazy(() => import('../pages/AgentBuilder'));
const OrgDashboard = lazy(() => import('../pages/OrgDashboard'));
const DevConsole = lazy(() => import('../pages/DevConsole'));
const DocsPage = lazy(() => import('../pages/DocsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

import PageTransition from '../components/common/PageTransition';

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
