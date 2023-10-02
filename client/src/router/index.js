import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AuthLayoutRoutes from '../modules/Auth/routes';
import HomeLayoutRoutes from '../modules/Home/routes';
import RestrictUnauthenticated from 'middlewares/RestrictUnauthenticated';
import RestrictAuthenticated from 'middlewares/RestrictAuthenticated';
import ErrorElement from 'modules/Error/SomeThingWrong';

const LandingLayout = React.lazy(() =>
  import('../modules/Landing/ModuleLayout')
);
const AuthLayout = React.lazy(() => import('../modules/Auth/ModuleLayout'));
const HomeLayout = React.lazy(() => import('../modules/Home/HomeLayout'));

const router = createBrowserRouter([
  {
    path: '/auth/*',
    element: (
      <RestrictUnauthenticated whiteList={['confirm-email', 'reset-password']}>
        <AuthLayout />
      </RestrictUnauthenticated>
    ),
    children: AuthLayoutRoutes,
    errorElement: <ErrorElement />,
  },
  {
    path: '/',
    element: (
      <RestrictUnauthenticated>
        <LandingLayout />
      </RestrictUnauthenticated>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/*',
    element: (
      <RestrictAuthenticated>
        <HomeLayout />
      </RestrictAuthenticated>
    ),
    children: HomeLayoutRoutes,
    errorElement: <ErrorElement />,
  },
]);

export default router;
