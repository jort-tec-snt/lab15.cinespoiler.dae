import { useQuery } from "@tanstack/react-query"

import { getHorrorMovies } from "../api/movies.api"
import MovieGrid from "../MovieGrid"

function MoviesPage() {
  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movies", "horror"],
    queryFn: getHorrorMovies,
  })

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-slate-400">Cargando películas de terror...</p>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-50">
          Error al cargar películas
        </h1>

        <p className="mt-2 text-slate-400">
          {error instanceof Error
            ? error.message
            : "Ocurrió un error inesperado."}
        </p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-red-400">
          Horror collection
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-50 md:text-5xl">
          Películas de terror
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Explora películas populares de terror obtenidas desde TMDB.
        </p>
      </div>

      {movies && movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <p className="text-slate-400">No se encontraron películas.</p>
      )}
    </section>
  )
}

export default MoviesPage