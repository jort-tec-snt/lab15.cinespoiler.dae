import { tmdbClient } from "@/lib/tmdb"
import type {
  TmdbMovieDetail,
  TmdbMoviesResponse,
} from "../types/movie.types"

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

export async function getMovieById(movieId: string) {
  const response = await tmdbClient.get<TmdbMovieDetail>(`/movie/${movieId}`, {
    params: {
      language: "es-ES",
    },
  })

  return response.data
}