import { Link, NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Energy API
      </Link>

      <div className="nav-links">
        <NavLink to="/energy-mix">Miks energetyczny</NavLink>
        <NavLink to="/charging-window">Okno ładowania</NavLink>
      </div>
    </nav>
  );
}