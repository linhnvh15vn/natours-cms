import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/components/main-layout';

import SignIn from '@/pages/auth/components/sign-in';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/tours',
        element: <div>TOURS</div>,
        children: [
          {
            index: true,
            element: <div>TOURS LIST</div>,
          },
          {
            path: '/tours/create',
            element: <div>TOUR FORM</div>,
          },
          {
            path: '/tours/edit/:_id',
            element: <div>TOUR FORM</div>,
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
