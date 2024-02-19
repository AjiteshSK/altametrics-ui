import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import SignUp from "./components/SignUp";
import BookPage from "./components/BookPage";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage />, errorElement: <ErrorPage /> },
  {
    path: "/app",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "book/:bib_key",
        element: <BookPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "search/:search_term",
        element: <Search />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  { path: "/sign-up", element: <SignUp />, errorElement: <ErrorPage /> },
]);
