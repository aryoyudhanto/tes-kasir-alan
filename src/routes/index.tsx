import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/index";
import Transasksi from "../pages/Transasksi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/transaksi",
    element: <Transasksi />,
  },
]);

const index = () => {
  return <RouterProvider router={router} />;
};

export default index;
