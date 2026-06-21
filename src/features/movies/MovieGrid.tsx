import MovieCard from "./MovieCard"
import type { TmdbMovie } from "./types/movie.types"

type MovieGridProps = {
  movies: TmdbMovie[]
  onOpenMovieDetail: (movieId: number) => void
}

function MovieGrid({ movies, onOpenMovieDetail }: MovieGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onOpenDetail={onOpenMovieDetail}
        />
      ))}
    </div>
  )
}

export default MovieGrid