import { useState } from "react"
import { Link } from "react-router"
import { useQuery } from "@tanstack/react-query"
import {
  Calendar,
  CheckCircle2,
  Clock,
  Minus,
  Plus,
  Star,
  Ticket,
} from "lucide-react"

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

const TICKET_PRICE = 18

const SHOWTIMES = [
  "Hoy 6:30 PM",
  "Hoy 8:45 PM",
  "Hoy 10:15 PM",
  "Mañana 7:30 PM",
]

function MovieDetailSheet({
  movieId,
  open,
  onOpenChange,
}: MovieDetailSheetProps) {
  const [selectedShowtime, setSelectedShowtime] = useState(SHOWTIMES[0])
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [ticketConfirmed, setTicketConfirmed] = useState(false)

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
  const total = ticketQuantity * TICKET_PRICE

  function handleDecreaseQuantity() {
    setTicketQuantity((currentQuantity) => {
      if (currentQuantity === 1) {
        return 1
      }

      return currentQuantity - 1
    })

    setTicketConfirmed(false)
  }

  function handleIncreaseQuantity() {
    setTicketQuantity((currentQuantity) => {
      if (currentQuantity === 8) {
        return 8
      }

      return currentQuantity + 1
    })

    setTicketConfirmed(false)
  }

  function handleSelectShowtime(showtime: string) {
    setSelectedShowtime(showtime)
    setTicketConfirmed(false)
  }

  function handleConfirmTicket() {
    setTicketConfirmed(true)
  }

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
                    S/ {TICKET_PRICE.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm leading-7 text-slate-300">
              {movie.overview || "Esta película todavía no tiene sinopsis."}
            </p>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">
                  Selecciona tu función
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {SHOWTIMES.map((showtime) => {
                    const isSelected = selectedShowtime === showtime

                    return (
                      <button
                        key={showtime}
                        type="button"
                        onClick={() => handleSelectShowtime(showtime)}
                        className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                          isSelected
                            ? "border-red-500 bg-red-600 text-white"
                            : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                        }`}
                      >
                        {showtime}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-3">
                <div>
                  <p className="text-sm text-slate-400">Cantidad</p>
                  <p className="text-xs text-slate-500">Máximo 8 tickets</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDecreaseQuantity}
                    className="flex size-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  >
                    <Minus className="size-4" />
                  </button>

                  <span className="w-6 text-center text-lg font-bold text-white">
                    {ticketQuantity}
                  </span>

                  <button
                    type="button"
                    onClick={handleIncreaseQuantity}
                    className="flex size-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total</p>
                  <p className="text-xs text-slate-500">
                    {selectedShowtime} · {ticketQuantity} ticket
                    {ticketQuantity > 1 ? "s" : ""}
                  </p>
                </div>

                <p className="text-3xl font-black text-white">
                  S/ {total.toFixed(2)}
                </p>
              </div>

              {ticketConfirmed && (
                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">
                  <CheckCircle2 className="mt-0.5 size-4" />
                  <p>
                    Ticket agregado de forma simulada. En la siguiente fase
                    conectaremos esto con un mini carrito.
                  </p>
                </div>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                className="bg-red-600 text-white hover:bg-red-500"
                onClick={handleConfirmTicket}
              >
                <Ticket className="mr-2 size-4" />
                Agregar ticket
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