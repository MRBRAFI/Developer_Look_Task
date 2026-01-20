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
        loader: () => fetch("/country.json").then((res) => res.json()),
        element: <HomePage></HomePage>,
      },
    ],
  },
]);
