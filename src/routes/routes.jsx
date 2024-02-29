import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { CheckCode, Home, Login, Register } from '../pages/index';

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
        element: <CheckCode />,
      },
    ],
  },
]);
