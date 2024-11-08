// index.js
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import LazySoul from "./pages/LazySoul";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App component as the root
    children: [
      { path: "/", element: <Home /> },
      { path: "/lazysoul", element: <LazySoul /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
