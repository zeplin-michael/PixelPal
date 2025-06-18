import { NavLink } from "react-router";
import "./LearnMore.css";

export default function LearnMore() {
  return (
    <div className="learnmore">
      <main className="learnmore-main">
        <h2 className="learnmore-title">How to play PixelPal?</h2>
        <p className="learnmore-text">Lets see how it works!</p>

        <div className="feature-gallery">
          <div className="feature-item">
            <img
              src="/public/img/game-play/BedTime.png"
              alt="Sleeping PixelPal"
              className="feature-image"
            />
            <p className="feature-text">Sleep</p>
          </div>

          <div className="feature-item">
            <img
              src="/public/img/game-play/MealTime.png"
              alt="Eating PixelPal"
              className="feature-image"
            />
            <p className="feature-text">Feed</p>
          </div>

          <div className="feature-item">
            <img
              src="/public/img/game-play/PlayTime.png"
              alt="Playing PixelPal"
              className="feature-image"
            />
            <p className="feature-text">Play</p>
          </div>
        </div>
      </main>

      <footer className="learnmore-footer">
        <NavLink to="/" className="button-link">
          Home
        </NavLink>
        <NavLink to="/gallery" className="button-link">
          Gallery
        </NavLink>
      </footer>
    </div>
  );
}
