import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import LearnMore from "./LearnMore";

import { useAuth } from "../auth/AuthContext";
import "./Homepage.css";

export default function Homepage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [showLearnMore, setShowLearnMore] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowLearnMore(true);
      } else {
        setShowLearnMore(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // logo for link to homepage

    <div className="homepage">
      <main className="homepage-main">
        <h2 className="homepage-title">Welcome to PixelPal</h2>
        <p className="homepage-subtitle">Adopt a virtual pet today!</p>

        <div className="pet-placeholder">
          <div className="scroll-down-arrows">
            <span className="arrow">↓</span>
            <span className="arrow">↓</span>
            <span className="arrow">↓</span>
          </div>

          <div className="homepage-image-container">
            <span className="click-me-text">Click Me</span>
            <img
              className="homepage-image"
              src="/img/game-play/alien_idle_360.gif"
              alt="Animated pet"
              onClick={() =>
                token ? navigate("/profile") : navigate("/login")
              }
            />
          </div>
          <div className="scroll-down-arrows">
            <span className="arrow">↓</span>
            <span className="arrow">↓</span>
            <span className="arrow">↓</span>
          </div>
        </div>

        <div style={{ height: "85vh" }}></div>
      </main>
      <div className={`learn-more-overlay${showLearnMore ? " visible" : ""}`}>
        <LearnMore />
      </div>
    </div>
  );
}
