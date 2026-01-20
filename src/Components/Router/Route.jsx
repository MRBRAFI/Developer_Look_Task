import { createBrowserRouter } from "react-router";
import MainLayout from "../../Layout/MainLayout";
import HomePage from "../Home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
    ],
  },
]);
