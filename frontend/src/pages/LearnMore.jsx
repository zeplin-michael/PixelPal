import { useState } from "react";
import "./LearnMore.css";

const features = [
  {
    key: "sleep",
    img: "/img/game-play/alien_sleeping_360.gif",
    alt: "Sleeping PixelPal",
    label: "Sleep",
    description:
      "Let your PixelPal rest to restore its energy. Sleep is essential for keeping your pet happy and healthy!",
  },
  {
    key: "feed",
    img: "/img/game-play/MealTime.png",
    alt: "Eating PixelPal",
    label: "Feed",
    description:
      "Feed your PixelPal delicious meals to keep it full and satisfied. Don't let it go hungry!",
  },
  {
    key: "play",
    img: "/img/game-play/PlayTime.png",
    alt: "Playing PixelPal",
    label: "Play",
    description:
      "Play with your PixelPal to boost its mood and keep it entertained. Happy pets live longer!",
  },
  {
    key: "bathe",
    img: "/img/game-play/BathTime.png",
    alt: "Bathe PixelPal",
    label: "Bathe",
    description:
      "Keep your PixelPal clean and fresh by giving it a bath. Hygiene is important for good health!",
  },
];

export default function LearnMore() {
  const [open, setOpen] = useState(null);

  return (
    <div className="learnmore">
      <main className="learnmore-main">
        <h2 className="learnmore-title">How to play PixelPal?</h2>
        <p className="learnmore-text">Lets see how it works!</p>

        <div className="feature-gallery">
          {features.map((feature) => (
            <div
              key={feature.key}
              className="feature-item"
              tabIndex={0}
              onClick={() => setOpen(feature.key)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && setOpen(feature.key)
              }
              role="button"
              aria-label={`Learn more about ${feature.label}`}
            >
              <img
                src={feature.img}
                alt={feature.alt}
                className="feature-image"
              />
              <p className="feature-text">{feature.label}</p>
            </div>
          ))}
        </div>

        {open && (
          <div
            className="learnmore-modal-overlay"
            onClick={() => setOpen(null)}
          >
            <div
              className="learnmore-modal"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
            >
              <button
                className="learnmore-modal-close"
                onClick={() => setOpen(null)}
                aria-label="Close"
              >
                &times;
              </button>
              <div className="learnmore-modal-content">
                <div className="learnmore-modal-left">
                  <h3 className="learnmore-modal-title">
                    {features.find((f) => f.key === open).label}
                  </h3>
                  <img
                    src={features.find((f) => f.key === open).img}
                    alt={features.find((f) => f.key === open).alt}
                    className="feature-image modal-image"
                  />
                </div>
                <div className="learnmore-modal-right">
                  <p className="learnmore-modal-desc">
                    {features.find((f) => f.key === open).description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
