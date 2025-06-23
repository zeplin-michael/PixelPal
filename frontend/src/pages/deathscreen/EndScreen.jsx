// Description: A React component that displays a death screen
// with a tombstone and options to restart or exit the game.
// This component uses Framer Motion for animations and CSS for styling.
// Sound effect from pixabay.com, created by Lesiakower.
// License: CC0 1.0 Universal (CC0 1.0) Public

import { motion } from "framer-motion";
import "./EndScreen.css";
import gravestone from "../../../assets/gravestone.png";

const Tombstone = () => (
  //
  <>
    <div id="gravestone-emoji">🪦</div>
    <img src={gravestone} alt="Gravestone" className="png" />
    <br />
    <h2>R.I.P.</h2>
  </>
);

const Options = ({ onSelect }) => {
  const playSound = () => {
    const audio = new Audio("../../assets/8-bit-game-over-sound-effect.mp3");
    audio.play();
  };

  return (
    <>
      <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="tombstone"
      >
        <img src={gravestone} alt="Gravestone" className="png" />
        <div id="gravestone-emoji">
          <h1 style={{ fontSize: "10rem" }}>🪦</h1>
          <h5 style={{ color: "white" }}>R.I.P.</h5>
          <h7 style={{ color: "white" }}>Try Again?</h7>
          <button
            className="buttons"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <p>Yes</p>
          </button>
          <button
            className="buttons"
            onClick={() => {
              playSound();
              onSelect(false);
            }}
          >
            <p>No</p>
          </button>
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
