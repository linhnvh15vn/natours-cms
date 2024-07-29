import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/components/main-layout';

import SignIn from '@/pages/auth/components/sign-in';
import Tour from '@/pages/tour';
import TourList from '@/pages/tour/components/tour-list';
import TourForm from '@/pages/tour/components/tour-form';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
        element: <div>USERS</div>,
        children: [
          {
            index: true,
            element: <div>USER LIST</div>,
          },
          {
            path: '/users/:_id',
            element: <div>USER FORM</div>,
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
        element: <SignIn />,
      },
    ],
  },
]);

export default router;
