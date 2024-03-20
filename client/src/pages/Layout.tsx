import {  Outlet } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Layout = () => {

  return (
    <>
      <header>
<Navbar />
      </header>
      <main>
        <div className="container mt-5">
          <Outlet />
        </div>
      </main>
      <footer className="bg-dark text-light py-3 mt-5">
        <div className="container">
<Footer/>
        </div>
      </footer>
    </>
  );
};

