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
              src="/img/game-play/alien_sleeping_360.gif"
              alt="Sleeping PixelPal"
              className="feature-image"
            />
            <p className="feature-text">Sleep</p>
          </div>

          <div className="feature-item">
            <img
              src="/img/game-play/MealTime.png"
              alt="Eating PixelPal"
              className="feature-image"
            />
            <p className="feature-text">Feed</p>
          </div>

          <div className="feature-item">
            <img
              src="/img/game-play/PlayTime.png"
              alt="Playing PixelPal"
              className="feature-image"
            />
            <p className="feature-text">Play</p>
          </div>
          <div className="feature-item">
            <img
              src="/img/game-play/BathTime.png"
              alt="Bathe PixelPal"
              className="feature-image"
            />
            <p className="feature-text">Bathe</p>
          </div>
        </div>
      </main>
    </div>
  );
}
