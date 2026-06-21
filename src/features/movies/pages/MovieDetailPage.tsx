import { Link, useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, Calendar, Clock, Star, Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getMovieById } from "../api/movies.api"
import { getTmdbImageUrl } from "../api/tmdb-images"

function MovieDetailPage() {
  const { id } = useParams()
  const movieId = id ?? ""

  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId),
    enabled: Boolean(movieId),
  })

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-slate-400">Cargando detalle de película...</p>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-50">
          Error al cargar el detalle
        </h1>

        <p className="mt-2 text-slate-400">
          {error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado."}
        </p>

        <Button asChild className="mt-6 bg-red-600 text-white hover:bg-red-500">
          <Link to="/movies">Volver a películas</Link>
        </Button>
      </section>
    )
  }

  if (!movie) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-slate-400">No se encontró la película.</p>
      </section>
    )
  }

  const posterUrl = getTmdbImageUrl(movie.poster_path, "w500")
  const backdropUrl = getTmdbImageUrl(movie.backdrop_path, "original")
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Sin fecha"

  return (
    <section className="relative min-h-[calc(100vh-8rem)] overflow-hidden">
      {backdropUrl && (
        <div className="absolute inset-0">
          <img
            src={backdropUrl}
            alt={`Banner de ${movie.title}`}
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950 to-slate-950" />
        </div>
      )}

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <Button
          asChild
          variant="ghost"
          className="mb-8 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <Link to="/movies" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Volver a películas
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`Poster de ${movie.title}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center text-slate-400">
                Sin poster disponible
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white md:text-6xl">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="mt-4 max-w-2xl text-lg italic text-red-300">
                “{movie.tagline}”
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <Star className="size-4 fill-yellow-300 text-yellow-300" />
                {movie.vote_average.toFixed(1)} / 10
              </span>

              <span className="flex items-center gap-2">
                <Calendar className="size-4" />
                {releaseYear}
              </span>

              <span className="flex items-center gap-2">
                <Clock className="size-4" />
                {movie.runtime ? `${movie.runtime} min` : "Duración no disponible"}
              </span>
            </div>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
              {movie.overview || "Esta película todavía no tiene sinopsis."}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-red-600 text-white hover:bg-red-500"
              >
                <Ticket className="mr-2 size-5" />
                Comprar ticket
              </Button>

              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
              >
                <Link to="/movies">Seguir explorando</Link>
              </Button>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-400">
              <p>
                Precio referencial del ticket:{" "}
                <span className="font-semibold text-slate-100">S/ 18.00</span>
              </p>
              <p className="mt-1">
                Estado en TMDB:{" "}
                <span className="font-semibold text-slate-100">
                  {movie.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovieDetailPage