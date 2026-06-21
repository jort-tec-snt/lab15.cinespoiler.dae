import { Link, NavLink } from "react-router"
import { Button } from "@/components/ui/button"

function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-bold tracking-tight text-slate-50">
          CineSpoilerS
        </Link>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <NavLink to="/">Home</NavLink>
          </Button>

          <Button variant="ghost" asChild>
            <NavLink to="/movies">Movies</NavLink>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header