import { createBrowserRouter } from "react-router-dom";
import UserListComponent from "../../component/user/user-list.component";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserListComponent />,
  },
]);
