import MovieCard from "./MovieCard"
import type { TmdbMovie } from "./types/movie.types"

type MovieGridProps = {
  movies: TmdbMovie[]
}

function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieGrid