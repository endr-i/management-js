import { createBrowserRouter } from "react-router-dom";
import User from '../../root/user/user';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
  },
]);
