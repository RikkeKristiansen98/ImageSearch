import React from "react";
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
        <div className="d-flex justify-content-end flex-grow-2">
          <ul className="navbar-nav">
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
        </div>
        <div>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </nav>
  );
};
