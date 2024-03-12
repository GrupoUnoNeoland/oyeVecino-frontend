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
  Createservice,
  CreateStatement,
  CreateEvent,
  UpdateStatement,
  UpdateOffService,
  UpdateEvent,
} from '../pages/index';
import { ProtectedRequestChildren } from '../components/ProtectedRoute/ProtectedRequestChildren';
import { ProtectedCheckChildren } from '../components/ProtectedRoute/ProtectedCheckChildren';

import { UpdateProfile } from '../pages/UpdateProfile';
import { UpdateDemService } from '../pages/UpdateDemService';

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
        path: '/create/service/offered',
        element: <Createservice type="offered" />,
      },
      {
        path: '/create/service/demanded',
        element: <Createservice type="demanded" />,
      },
      {
        path: '/create/event',
        element: <CreateEvent />,
      },
      {
        path: '/create/statement',
        element: <CreateStatement />,
      },
      {
        path: '/update/statement/:id',
        element: <UpdateStatement />,
      },
      {
        path: '/update/offserv/:id',
        element: <UpdateOffService />,
      },
      {
        path: '/update/demserv/:id',
        element: <UpdateDemService />,
      },
      {
        path: '/update/event/:id',
        element: <UpdateEvent />,
      },
      {
        path: '/profile/:id',
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
        children: [
          {
            path: '/profile/:id/changePassword',
            element: (
              <Protected>
                <ChangePassword />
              </Protected>
            ),
          },
          {
            path: '/profile/:id/update',
            element: (
              <Protected>
                <UpdateProfile />
              </Protected>
            ),
          },

          //   {
          //     path: '/profile/admin',
          //     element: <AdminProfile />,
          //   },
        ],
      },
    ],
  },
]);
