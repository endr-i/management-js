import { createBrowserRouter, Navigate } from "react-router-dom";
import Users from '../../root/user/users';
import User from '../../root/user/[id]/user';
import PageLayout from '../../component/layout/page';
import NotFound from '../../root/not-found/not-found';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/users" />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:id",
        element: <User />,
      },
      {
        path: "/create",
        element: <User />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
