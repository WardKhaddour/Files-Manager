import React from 'react';

import NotFound from 'modules/Error/NotFound';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ConfirmEmail from '../pages/ConfirmEmail';

const routes = [
  {
    path: '',
    element: <Login />,
    index: true,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: 'reset-password/:resetToken',
    element: <ResetPassword />,
  },
  {
    path: 'confirm-email/:confirmToken',
    element: <ConfirmEmail />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
