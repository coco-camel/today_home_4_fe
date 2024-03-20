import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Main from '../pages/Main';
import React from 'react';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
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
