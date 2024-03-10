import { NavLink, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

export const Layout = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <header className="bg-dark text-light py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
          <NavLink to="/"><h4>Image search</h4> </NavLink>
          </div>
          <div>
            <NavLink to="/MyFavorites" className="text-light me-3">Favorite images</NavLink>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />} 
          </div>
        </div>
      </header>
      <main>
        <div className="container mt-5">
          <Outlet />
        </div>
      </main>
      <footer className="bg-dark text-light py-3 mt-5">
        <div className="container">
          <p>Footer</p>
        </div>
      </footer>
    </>
  );
};

