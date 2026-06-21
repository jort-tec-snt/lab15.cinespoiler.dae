import { createBrowserRouter } from "react-router"

import AppLayout from "@/components/layout/AppLayout"
import HomePage from "@/features/movies/pages/HomePage"
import MovieDetailPage from "@/features/movies/pages/MovieDetailPage"
import MoviesPage from "@/features/movies/pages/MoviesPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "movies/:id",
        element: <MovieDetailPage />,
      },
    ],
  },
])