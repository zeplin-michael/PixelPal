import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import "./LearnMore.css";

const playFeatures = [
  {
    key: "sleep",
    img: "/assets/pals/green_alien/gn_alien_sleeping.gif",
    alt: "Sleeping PixelPal",
    label: "Sleep",
    description:
      "Let your PixelPal rest to restore its energy. Sleep is essential for keeping your pet happy and healthy!",
  },
  {
    key: "feed",

    img: "/assets/pals/grey_alien/gy_alien_eating.gif",

    alt: "Eating PixelPal",
    label: "Feed",
    description:
      "Feed your PixelPal delicious meals to keep it full and satisfied. Don't let it go hungry!",
  },
  {
    key: "play",

    img: "/assets/pals/pink_alien/pk_alien_playing.gif",

    alt: "Playing PixelPal",
    label: "Play",
    description:
      "Play with your PixelPal to boost its mood and keep it entertained. Happy pets live longer!",
  },
  {
    key: "bathe",

    img: "/assets/pals/green_alien/gn_alien_bath.gif",

    alt: "Bathe PixelPal",
    label: "Bathe",
    description:
      "Keep your PixelPal clean and fresh by giving it a bath. Hygiene is important for good health!",
  },
];

const createPetSteps = [
  {
    key: "signup",
    img: "../assets/Pals/Gold Robot/gld_robot_idle.gif",
    alt: "Sign Up",
    label: "Sign Up",
    description: "Create an account to get started with PixelPal.",
  },
  {
    key: "login",
    img: "../assets/Pals/Gold Robot/gld_robot_eating.gif",
    alt: "Log In",
    label: "Log In",
    description: "Log in to your account to access your profile.",
  },
  {
    key: "profile",
    img: "../assets/Pals/Gold Robot/gld_robot_bath.gif",
    alt: "Go to Profile",
    label: "Go to Profile",
    description: "Navigate to your profile page after logging in.",
  },
  {
    key: "create",
    img: "../assets/Pals/Gold Robot/gld_robot_playing.gif",
    alt: "Create Pet",
    label: "Create Your Pet",
    description: "Fill out the form to create your very own PixelPal!",
  },
];

export default function LearnMore() {
  const [open, setOpen] = useState(null);
  const { token } = useAuth();

  // Choose which set of features/steps to show
  const features = token ? playFeatures : createPetSteps;
  const title = token ? "How to play PixelPal?" : "How to create your PixelPal";
  const subtitle = token
    ? "Let's see how it works!"
    : "Follow these steps to get your own PixelPal!";

  return (
    <div className="learnmore">
      <main className="learnmore-main">
        <h2 className="learnmore-title">{title}</h2>
        <p className="learnmore-text">{subtitle}</p>

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
