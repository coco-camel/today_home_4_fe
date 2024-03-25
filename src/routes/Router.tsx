import {
  Navigate,
  createBrowserRouter,
} from 'react-router-dom';
import App from '../App';
import Main from '../pages/Main';
import React, { ReactNode } from 'react';
import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import Layout from '../components/layout/Layout';
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage';
import MyPage from '../pages/MyPage';
import useIsLoggedIn from '../components/useIsLogged';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    children
  );
};

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
          {
            path: '/mypage',
            element: <MyPage />,
          },
          {
            path: '/detail/:productId',
            element: <ProductDetailPage />,
          },
        ],
      },
      {
        path: '/signup',
        element: (
          <ProtectedRoute>
            <SignUp />,
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
