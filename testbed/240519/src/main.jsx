import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  PagePreventedLeaveWithUseCallback,
  PagePreventedLeaveWithoutUseCallback,
} from "./routes/TestPreventLeave";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/withUseCallback",
    element: <PagePreventedLeaveWithUseCallback />,
  },
  {
    path: "/withoutUseCallBack",
    element: <PagePreventedLeaveWithoutUseCallback />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode> // console.log가 2번 출력되는걸 방지
  <RouterProvider router={router} />
  // </React.StrictMode>,
);
