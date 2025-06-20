import { NavLink } from "react-router";
import "./Gallery.css";

export default function Gallery() {
  return (
    <div className="gallery">
      <main className="gallery-main">
        <h2 className="gallery-title">PixelPal Gallery</h2>
        <p className="gallery-text">See other players Pets!</p>

        <div className="feature-grid">
          <div className="gallery-item">
            <img src="/images/sleep" alt="PixelPal" className="feature-image" />
            <p className="feature-text">Pet Name</p>
          </div>

          <div className="gallery-item">
            <img
              src="/images/feed"
              alt="PixelPal 2"
              className="feature-image"
            />
            <p className="feature-text">Pet Name</p>
          </div>

          <div className="gallery-item">
            <img
              src="/images/play"
              alt="PixelPal 3"
              className="feature-image"
            />
            <p className="feature-text">Pet Name</p>
          </div>
        </div>
      </main>
    </div>
  );
}
