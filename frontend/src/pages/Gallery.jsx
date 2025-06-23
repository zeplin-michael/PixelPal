import { NavLink } from "react-router";
import "./Gallery.css";

export default function Gallery() {
  return (
    <div className="gallery">
      <main className="gallery-main">
        <h2 className="gallery-title">PixelPal Gallery</h2>
        <p className="gallery-text">Check in on your pals!</p>

        <div className="feature-grid">
          <div className="gallery-item">
            <img
              src="/img/game-play/merpet.png"
              alt="PixelPal"
              className="feature-image"
            />
            <p className="feature-text">Bubbles</p>
          </div>

          <div className="gallery-item">
            <img
              src="/img/game-play/Bird.png"
              alt="PixelPal 2"
              className="feature-image"
            />
            <p className="feature-text">Starla</p>
          </div>

          <div className="gallery-item">
            <img
              src="/img/game-play/unicorn.png"
              alt="PixelPal 3"
              className="feature-image"
            />
            <p className="feature-text">Glitzy</p>
          </div>

          <div className="gallery-item">
            <img
              src="/img/game-play/alien_720.png"
              alt="PixelPal 2"
              className="feature-image"
            />
            <p className="feature-text">Orbit</p>
          </div>

          <div className="gallery-item">
            <img
              src="/img/game-play/robot_720.png"
              alt="PixelPal 3"
              className="feature-image"
            />
            <p className="feature-text">Beeple</p>
          </div>
        </div>
      </main>
    </div>
  );
}
