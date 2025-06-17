// Description: A React component that displays a death screen
// with a tombstone and options to restart or exit the game.
// This component uses Framer Motion for animations and Tailwind CSS for styling.
// Sound effect from pixabay.com, created by Lesiakower.
// License: CC0 1.0 Universal (CC0 1.0) Public

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const playDeathSound = () => {
  const audio = new Audio("../../assets/8-bit-game-over-sound-effect.mp3");
  audio.play().catch((error) => console.error("Error playing sound:", error));
};

const Tombstone = () => (
  <motion.div
    initial={{ y: -200, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 200, opacity: 0 }}
    transition={{ duration: 1 }}
    className="flex flex-col items-center justify-center p-4"
  >
    <div
      className="bg-gray-800 text-white p-6 rounded-xl shadow-lg text-center"
      style={{
        fontFamily: "monospace",
        fontSize: "2rem",
        imageRendering: "pixelated",
      }}
    >
      <div>🪦</div>
      <div className="mt-2">R.I.P.</div>
    </div>
  </motion.div>
);

const Options = ({ onSelect }) => (
  <div className="flex space-x-4 mt-6">
    <button
      onClick={() => onSelect(true)}
      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl shadow"
    >
      Yes
    </button>
    <button
      onClick={() => onSelect(false)}
      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl shadow"
    >
      No
    </button>
  </div>
);

export default function EndScreen({ onRestart }) {
  useEffect(() => {
    playDeathSound();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <Tombstone />
      <div className="text-xl mt-4">Try Again?</div>
      <Options onSelect={(choice) => choice && onRestart()} />
    </div>
  );
}

// export default function App() {
//   const [showEnd, setShowEnd] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <AnimatePresence>
//         {showEnd ? (
//           <EndScreen key="end" onRestart={() => setShowEnd(false)} />
//         ) : (
//           <motion.div
//             key="start"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="text-center"
//           >
//             <h1 className="text-4xl font-bold mb-4">Pick your PixelPal</h1>
//             <button
//               onClick={() => setShowEnd(true)}
//               className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
//             >
//               Start
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
