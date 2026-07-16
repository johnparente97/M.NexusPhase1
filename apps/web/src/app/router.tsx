import { createBrowserRouter } from 'react-router-dom';
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
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const suspenseWrapper = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingPage />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
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
      { path: '*', element: suspenseWrapper(NotFoundPage) },
    ],
  },
]);
