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
  Chat,
  DataProfile,
} from '../pages/index';
import { ProtectedRequestChildren } from '../components/ProtectedRoute/ProtectedRequestChildren';
import { ProtectedCheckChildren } from '../components/ProtectedRoute/ProtectedCheckChildren';

import { UpdateProfile } from '../pages/UpdateProfile';
import { UpdateDemService } from '../pages/UpdateDemService';
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
        path: '/chat',
        element: (
          <Protected>
            <Chat />
          </Protected>
        ),
      },

      {
        path: '/service/:id',
        element: (
          <Protected>
            <Service />
          </Protected>
        ),
      },

      {
        path: '/statement/:id',
        element: (
          <Protected>
            <Statement />
          </Protected>
        ),
      },
      {
        path: '/event/:id',
        element: (
          <Protected>
            <Event />
          </Protected>
        ),
      },
      {
        path: '/create/service/offered',
        element: (
          <Protected>
            <Createservice type="offered" />
          </Protected>
        ),
      },
      {
        path: '/create/service/demanded',
        element: (
          <Protected>
            <Createservice type="demanded" />
          </Protected>
        ),
      },
      {
        path: '/create/event',
        element: (
          <Protected>
            <CreateEvent />
          </Protected>
        ),
      },
      {
        path: '/create/statement',
        element: (
          <Protected>
            <CreateStatement />
          </Protected>
        ),
      },
      {
        path: '/update/statement/:id',
        element: (
          <Protected>
            <UpdateStatement />
          </Protected>
        ),
      },
      {
        path: '/update/offserv/:id',
        element: (
          <Protected>
            <UpdateOffService />
          </Protected>
        ),
      },
      {
        path: '/update/demserv/:id',
        element: (
          <Protected>
            <UpdateDemService />
          </Protected>
        ),
      },
      {
        path: '/update/event/:id',
        element: (
          <Protected>
            <UpdateEvent />
          </Protected>
        ),
      },
      // {
      //   path: '/admin',
      //   element: <AdminProfile />,
      // },
      {
        path: '/profile/:id',
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
        children: [
          {
            path: '/profile/:id',
            element: (
              <Protected>
                <DataProfile />
              </Protected>
            ),
          },
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
        ],
      },
    ],
  },
]);
