import { Link } from "react-router"
import { Calendar, Star, Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getTmdbImageUrl } from "./api/tmdb-images"
import type { TmdbMovie } from "./types/movie.types"

type MovieCardProps = {
  movie: TmdbMovie
}

function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getTmdbImageUrl(movie.poster_path, "w500")
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Próximamente"

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:shadow-red-950/30">
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Poster de ${movie.title}`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-slate-400">
            Sin poster disponible
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          Terror
        </div>

        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-yellow-300 backdrop-blur">
          <Star className="size-3 fill-yellow-300" />
          {movie.vote_average.toFixed(1)}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="line-clamp-2 text-xl font-bold tracking-tight text-white">
            {movie.title}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-300">
            <Calendar className="size-4" />
            <span>{releaseYear}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <p className="line-clamp-3 text-sm leading-6 text-slate-400">
          {movie.overview || "Esta película todavía no tiene descripción."}
        </p>

        <div className="flex gap-2">
          <Button
            asChild
            variant="secondary"
            className="flex-1 border border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
          >
            <Link to={`/movies/${movie.id}`}>Ver detalle</Link>
          </Button>

          <Button
            asChild
            className="flex-1 bg-red-600 text-white hover:bg-red-500"
          >
            <Link to={`/movies/${movie.id}`} className="flex items-center gap-2">
              <Ticket className="size-4" />
              Ticket
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}

export default MovieCard