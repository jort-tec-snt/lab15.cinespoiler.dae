export type TmdbMovie = {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
}

export type TmdbMoviesResponse = {
  page: number
  results: TmdbMovie[]
  total_pages: number
  total_results: number
}

export type TmdbMovieDetail = {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  runtime: number | null
  status: string
  tagline: string | null
  genres: {
    id: number
    name: string
  }[]
}