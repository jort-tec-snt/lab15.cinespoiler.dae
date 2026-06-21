import { Link } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { Calendar, Clock, Star, Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { getMovieById } from "./api/movies.api"
import { getTmdbImageUrl } from "./api/tmdb-images"

type MovieDetailSheetProps = {
  movieId: number | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

function MovieDetailSheet({
  movieId,
  open,
  onOpenChange,
}: MovieDetailSheetProps) {
  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie-detail-sheet", movieId],
    queryFn: () => getMovieById(String(movieId)),
    enabled: open && movieId !== null,
  })

  const posterUrl = getTmdbImageUrl(movie?.poster_path ?? null, "w500")
  const backdropUrl = getTmdbImageUrl(movie?.backdrop_path ?? null, "w780")

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto border-slate-800 bg-slate-950 text-slate-50 sm:max-w-xl">
        {isLoading && (
          <div className="py-10 text-slate-400">
            Cargando detalles de la película...
          </div>
        )}

        {isError && (
          <div className="py-10">
            <h2 className="text-xl font-bold text-slate-50">
              Error al cargar detalle
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {error instanceof Error
                ? error.message
                : "Ocurrió un error inesperado."}
            </p>
          </div>
        )}

        {movie && (
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
              {backdropUrl && (
                <img
                  src={backdropUrl}
                  alt={`Banner de ${movie.title}`}
                  className="h-48 w-full object-cover opacity-70"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-400">
                  Vista rápida
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                  {movie.title}
                </h2>
              </div>
            </div>

            <SheetHeader>
              <SheetTitle className="text-left text-2xl text-slate-50">
                {movie.title}
              </SheetTitle>

              <SheetDescription className="text-left text-slate-400">
                {movie.tagline || "Detalles principales de la película."}
              </SheetDescription>
            </SheetHeader>

            <div className="grid gap-5 sm:grid-cols-[140px_1fr]">
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={`Poster de ${movie.title}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[2/3] items-center justify-center p-4 text-center text-sm text-slate-500">
                    Sin poster
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-slate-300">
                  <p className="flex items-center gap-2">
                    <Star className="size-4 fill-yellow-300 text-yellow-300" />
                    {movie.vote_average.toFixed(1)} / 10
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    {movie.release_date || "Sin fecha"}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock className="size-4" />
                    {movie.runtime
                      ? `${movie.runtime} min`
                      : "Duración no disponible"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">Ticket desde</p>
                  <p className="mt-1 text-2xl font-black text-white">
                    S/ 18.00
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-300">
              {movie.overview || "Esta película todavía no tiene sinopsis."}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button className="bg-red-600 text-white hover:bg-red-500">
                <Ticket className="mr-2 size-4" />
                Comprar ticket
              </Button>

              <Button
                asChild
                variant="secondary"
                className="border border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
              >
                <Link to={`/movies/${movie.id}`}>Ver página completa</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default MovieDetailSheet