import "./Navbar.css";
import { NavLink } from "react-router";
import { useEffect, useRef } from "react";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const navbarRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        navbarRef.current.classList.add("scrolled");
      } else {
        navbarRef.current.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <div className="navbar-container" ref={navbarRef}>
        <div className="navbar-brand">
          <NavLink id="brand" to="/">
            <img src="/home-icon.svg" alt="Home" className="navbar-home-icon" />
          </NavLink>
        </div>
        <nav>
          <NavLink to="/gallery">Gallery</NavLink>
          {token ? (
            <>
              <button onClick={logout} className="logout">
                Log out
              </button>
              <NavLink to="/profile">Profile</NavLink>
            </>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
