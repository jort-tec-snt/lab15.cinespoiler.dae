function HomePage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center px-6 text-center">
      <p className="mb-4 rounded-full border border-slate-800 bg-slate-900 px-4 py-1 text-sm text-slate-400">
        E-commerce de tickets de cine
      </p>

      <h1 className="text-5xl font-bold tracking-tight text-slate-50 md:text-7xl">
        CineSpoilerS
      </h1>

      <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
        Compra tickets de cine, revisa películas disponibles y explora sus detalles.
      </p>
    </section>
  )
}

export default HomePage