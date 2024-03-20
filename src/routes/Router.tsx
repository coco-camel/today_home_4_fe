import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Main from '../pages/Main';
import React from 'react';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Layout from '../components/layout/Layout';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Main />,
          },
        ],
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);
