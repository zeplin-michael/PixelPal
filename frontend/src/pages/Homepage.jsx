import { NavLink, useNavigate } from "react-router";

import { useAuth } from "../auth/AuthContext";
import "./Homepage.css";

export default function Homepage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  return (
    // logo for link to homepage

    <>
      <div className="homepage">
        <main className="homepage-main">
          <h2 className="homepage-title">Welcome to PixelPal</h2>
          <p className="homepage-subtitle">Adopt a virtual pet today!</p>

          <div className="pet-placeholder">
            <img
              className="homepage-image"
              src="/img/game-play/alien_idle_360.gif"
              alt="Animated pet"
              onClick={() =>
                token ? navigate("/profile") : navigate("/login")
              }
            />
          </div>
        </main>
      </div>
    </>
  );
}
