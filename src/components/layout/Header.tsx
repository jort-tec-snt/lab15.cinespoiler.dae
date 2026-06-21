import { Link, NavLink } from "react-router"
import { Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold tracking-tight text-slate-50"
        >
          <span className="flex size-8 items-center justify-center rounded-xl bg-red-600 text-sm text-white">
            CS
          </span>
          <span>CineSpoilerS</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <NavLink to="/">Home</NavLink>
          </Button>

          <Button variant="ghost" asChild>
            <NavLink to="/movies">Movies</NavLink>
          </Button>

          <Button
            asChild
            className="bg-red-600 text-white hover:bg-red-500"
          >
            <Link to="/movies" className="flex items-center gap-2">
              <Ticket className="size-4" />
              Tickets
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header