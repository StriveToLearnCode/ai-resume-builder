// index.jsx
import { createRoot } from 'react-dom/client';
import React, { Suspense, lazy } from 'react';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import 'animate.css';
import './i18n/i18n.js';
import LoadingScreen from './components/custom/LoadingScreen';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// 懒加载页面
const SignInPage = lazy(() => import('./auth/sign-in'));
const Home = lazy(() => import('./home'));
const Dashboard = lazy(() => import('./dashboard'));
const EditResume = lazy(() => import('./dashboard/resume/[resumeId]/edit'));
const ViewResume = lazy(() => import('./my-resume/[resumeId]/view'));
const MyTemplate = lazy(() => import('./my-template'));

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <EditResume />
          </Suspense>
        ),
      },
      {
        path: '/my-resume/:resumeId/view',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <ViewResume />
          </Suspense>
        ),
      },
      {
        path: '/my-template',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <MyTemplate />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/auth/sign-in',
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <SignInPage />
      </Suspense>
    ),
  },
]);


createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
  </ClerkProvider>
);
