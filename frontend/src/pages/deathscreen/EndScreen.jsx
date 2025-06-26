// Description: A React component that displays a death screen
// with a tombstone and options to restart or exit the game.
// This component uses Framer Motion for animations and CSS for styling.
// Sound effect from pixabay.com, created by Lesiakower.
// License: CC0 1.0 Universal (CC0 1.0) Public

import { motion } from "framer-motion";
import useQuery from "../../api/useQuery";
import "./EndScreen.css";
import { usePet } from "../../api/PetContext";
import gravestone from "/death_page/gravestone.png";

const Tombstone = () => (
  //
  <>
    <div id="gravestone-emoji">🪦</div>
    <img src={gravestone} alt="Gravestone" className="background" />
    <br />
    <h2>R.I.P.</h2>
  </>
);

const Options = ({ onSelect }) => {
  const playSound = () => {
    const audio = new Audio("/death_page/8-bit-game-over-sound-effect.mp3");
    audio.play();
  };
  const { pet } = usePet();
  const {
    data: stats,
    loading,
    error,
  } = useQuery(
    pet ? `/pet_overall_stats/${pet.id}` : null,
    pet ? `overallStats-${pet.id}` : null
  );

  return (
    <>
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="tombstone"
      >
        <img src={gravestone} alt="Gravestone" className="background" />
        <div id="gravestone-emoji">
          <h1 style={{ fontSize: "10rem" }}>🪦</h1>
          <h5 style={{ color: "white" }}>R.I.P.</h5>
          <h7 style={{ color: "white" }}>Try Again?</h7>
          <button
            className="endscreen-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <p>Yes</p>
          </button>
          <button
            className="endscreen-button"
            onClick={() => {
              playSound();
              onSelect(false);
            }}
          >
            <p>No</p>
          </button>
          <div className="endscreen-stats">
            {loading && (
              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                Loading stats...
              </div>
            )}
            {error && (
              <div
                style={{
                  color: "red",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                Error loading stats
              </div>
            )}
            {stats && (
              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  marginTop: "4rem",
                }}
              >
                <h3>Lifetime Stats</h3>
                <p>Total Meals: {stats.total_meals}</p>
                <p>Total Baths: {stats.total_baths}</p>
                <p>Total Play Sessions: {stats.total_play_sessions}</p>
                <p>Total Sleep Sessions: {stats.total_sleep_sessions}</p>
                <p>Days Alive: {stats.days_alive}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export { Tombstone, Options };
const EndScreen = () => {
  return (
    <div className="end-screen-container">
      <div
        className="try-again-section"
        style={{ textAlign: "center", marginTop: "1rem" }}
      >
        <div style={{ marginTop: "1rem" }}>
          <Options onSelect={() => {}} />
        </div>
      </div>
    </div>
  );
};
export default EndScreen;
