import "./Navbar.css";
import { NavLink, useNavigate } from "react-router";
import { useEffect, useRef } from "react";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const navbarRef = useRef();
  const navigate = useNavigate();
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
        <nav>
          <div className="navbar-brand">
            <NavLink id="brand" to="/">
              <img
                src="/home-icon.svg"
                alt="Home"
                className="navbar-home-icon"
              />
            </NavLink>
          </div>
          <div className="navbar-links">
            <NavLink to="/gallery">Gallery</NavLink>

            <NavLink to="/Credits">Credits</NavLink>


            {token ? (
              <>
                <NavLink to="/profile">Profile</NavLink>
                <button
                  onClick={() => {
                    navigate("/");
                    logout();
                  }}
                  className="logout"
                >
                  Log out
                </button>
              </>
            ) : (
              <NavLink to="/login">Log in</NavLink>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
