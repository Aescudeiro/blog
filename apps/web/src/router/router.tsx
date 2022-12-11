import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
  Home,
  Auth,
  SignIn,
  SignUp,
  Profile,
  Content,
  NewContent,
} from '../pages';
import { LayoutRoute, ProtectedRoute } from './components';

export const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <LayoutRoute />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: ':userId',
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: ':contentId',
            element: <Content />,
          },
        ],
      },
      {
        path: 'new-post',
        element: <NewContent />,
      },
    ],
    errorElement: <Navigate to="/" replace />,
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
]);
