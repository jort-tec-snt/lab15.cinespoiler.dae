import { tmdbClient } from "@/lib/tmdb"
import type { TmdbMoviesResponse } from "../types/movie.types"

export async function getHorrorMovies() {
  const response = await tmdbClient.get<TmdbMoviesResponse>("/discover/movie", {
    params: {
      with_genres: 27,
      sort_by: "popularity.desc",
      language: "es-ES",
      page: 1,
    },
  })

  return response.data.results
}