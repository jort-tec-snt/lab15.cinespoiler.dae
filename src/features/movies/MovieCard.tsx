import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { getTmdbImageUrl } from "./api/tmdb-images"
import type { TmdbMovie } from "./types/movie.types"

type MovieCardProps = {
  movie: TmdbMovie
}

function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getTmdbImageUrl(movie.poster_path, "w500")

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm transition hover:-translate-y-1 hover:border-red-500/60">
      <div className="aspect-[2/3] bg-slate-800">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Poster de ${movie.title}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-slate-400">
            Sin poster disponible
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-50">
            {movie.title}
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            ⭐ {movie.vote_average.toFixed(1)} ·{" "}
            {movie.release_date || "Sin fecha"}
          </p>
        </div>

        <p className="text-sm leading-6 text-slate-400">
          {movie.overview || "Esta película todavía no tiene descripción."}
        </p>

        <Button
          asChild
          className="w-full bg-red-600 text-white hover:bg-red-500"
        >
          <Link to={`/movies/${movie.id}`}>Ver detalle</Link>
        </Button>
      </div>
    </article>
  )
}

export default MovieCard