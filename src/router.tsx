import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/main-layout';

import SignIn from '@/pages/auth/components/sign-in';
import Tour from '@/pages/tour';
import TourList from '@/pages/tour/components/tour-list';
import TourForm from '@/pages/tour/components/tour-form';
import User from '@/pages/user';
import UserList from '@/pages/user/components/user-list';
import UserForm from '@/pages/user/components/user-form';

const router = createBrowserRouter([
  {
    path: '/',
    element: localStorage.getItem('token') ? (
      <MainLayout />
    ) : (
      <Navigate to="/auth" />
    ),
    children: [
      {
        path: '/tours',
        element: <Tour />,
        children: [
          {
            index: true,
            element: <TourList />,
          },
          {
            path: '/tours/create',
            element: <TourForm />,
          },
          {
            path: '/tours/edit/:_id',
            element: <TourForm />,
          },
        ],
      },
      {
        path: '/users',
        element: <User />,
        children: [
          {
            index: true,
            element: <UserList />,
          },
          {
            path: '/users/:_id',
            element: <UserForm />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        index: true,
        element: localStorage.getItem('token') ? <MainLayout /> : <SignIn />,
      },
    ],
  },
]);

export default router;
