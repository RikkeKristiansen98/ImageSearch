import { NavLink, useLocation } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Image Search
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className={`nav-item ${location.pathname === '/MyFavorites' ? 'active' : ''}`}>
              <NavLink className="nav-link" to="/MyFavorites">
                My Favorites
              </NavLink>
            </li>
          </ul>
          <div>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        </div>
      </div>
    </nav>
  );
};
