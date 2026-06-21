import { useParams } from "react-router"

function MovieDetailPage() {
  const { id } = useParams()

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-50">
        Detalle de película
      </h1>

      <p className="mt-2 text-slate-400">
        ID de película seleccionada: {id}
      </p>
    </section>
  )
}

export default MovieDetailPage