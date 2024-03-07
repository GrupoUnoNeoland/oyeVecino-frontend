import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { Protected } from '../components/ProtectedRoute/Protected';
import {
  CheckCode,
  ForgotPassword,
  Home,
  Login,
  Register,
  Dashboard,
  Request,
  Profile,
  ChangePassword,
  Service,
  Statement,
  Event,
} from '../pages/index';
import { ProtectedRequestChildren } from '../components/ProtectedRoute/ProtectedRequestChildren';
import { ProtectedCheckChildren } from '../components/ProtectedRoute/ProtectedCheckChildren';
import { AdminProfile } from '../pages/AdminProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/checkCode',
        element: (
          <ProtectedCheckChildren>
            <CheckCode />
          </ProtectedCheckChildren>
        ),
      },
      {
        path: '/forgotpassword',
        element: <ForgotPassword />,
      },
      {
        path: '/request',
        element: (
          <ProtectedRequestChildren>
            <Request />
          </ProtectedRequestChildren>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <Protected>
            <Dashboard />
          </Protected>
        ),
      },
      {
        path: '/service/:id',
        element: <Service />,
      },
      {
        path: '/statement/:id',
        element: <Statement />,
      },
      {
        path: '/event/:id',
        element: <Event />,
      },
      {
        path: '/profile',
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
        children: [
          {
            path: '/profile/changePassword',
            element: (
              <Protected>
                <ChangePassword />
              </Protected>
            ),
          },
          {
            path: '/profile/',
            element: <Protected>{/* <FormProfile /> */}</Protected>,
          },
          {
            path: '/profile/admin',
            element: <AdminProfile />,
          },
        ],
      },
    ],
  },
]);
