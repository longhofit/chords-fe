import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

type AppLayoutProps = {
  children: ReactNode
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link${isActive ? ' active' : ''}`

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand">
          Chords
        </Link>
        <nav className="nav">
          <NavLink to="/" className={navLinkClass} end>
            Songs
          </NavLink>
          <NavLink to="/favorites" className={navLinkClass}>
            Favorites
          </NavLink>
          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  )
}

export default AppLayout

