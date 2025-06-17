import "./Navbar.css";
import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink id="brand" to="/">
            <p>PixelPal</p>
          </NavLink>
        </div>
        <nav>
          {token ? (
            <button onClick={logout}>Log out</button>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
