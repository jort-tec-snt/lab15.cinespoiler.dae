import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"

function AppLayout() {
  return (
    <div className="min-h-screen text-slate-50">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default AppLayout