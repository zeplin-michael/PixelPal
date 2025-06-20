// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import Bath from "./game-page/components/bath";

// export default function PalLayout() {
//   const navigate = useNavigate();

//   const [feed, setFeed] = useState(100);
//   const [play, setPlay] = useState(100);
//   const [sleep, setSleep] = useState(100);
//   const [isAlive, setIsAlive] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFeed((f) => Math.max(f - 5, 0));
//       setPlay((p) => Math.max(p - 5, 0));
//       setSleep((s) => Math.max(s - 5, 0));
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (feed <= 0 || play <= 0 || sleep <= 0) {
//       setIsAlive(false);
//       navigate("/deathscreen");
//     }
//   }, [feed, play, sleep, navigate]);

//   function feedPet() {
//     setFeed((f) => Math.min(f + 10, 100));
//     <Bath />;
//   }

//   function playPet() {
//     setPlay((p) => Math.min(p + 10, 100));
//     setSleep((s) => Math.max(s - 5, 0));
//     setFeed((f) => Math.max(f - 5, 0));
//   }

//   function sleepPet() {
//     setSleep((s) => Math.min(s + 15, 100));
//   }

//   return (
//     <div>
//       <h2>{isAlive ? "My PixelPal" : "Your PixelPal has died."}</h2>
//       <div>
//         <p>Food: {feed}</p>
//         <p>Play: {play}</p>
//         <p>Sleep: {sleep}</p>
//       </div>

//       {isAlive && (
//         <div>
//           <button onClick={feedPet}>Feed</button>
//           <button onClick={playPet}>Play</button>
//           <button onClick={sleepPet}>Sleep</button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Bath from "./game-page/components/bath";
import Bed from "./game-page/components/bed";
import Meal from "./game-page/components/meal";
import Default from "./game-page/components/default";
// Import your other components here
// import FeedComponent from "./game-page/components/feed";
// import PlayComponent from "./game-page/components/play";
// import SleepComponent from "./game-page/components/sleep";

export default function PalLayout() {
  const navigate = useNavigate();

  const [feed, setFeed] = useState(100);
  const [play, setPlay] = useState(100);
  const [sleep, setSleep] = useState(100);
  const [isAlive, setIsAlive] = useState(true);
  const [currentScene, setCurrentScene] = useState(null); // Track which scene to show

  useEffect(() => {
    const interval = setInterval(() => {
      setFeed((f) => Math.max(f - 5, 0));
      setPlay((p) => Math.max(p - 5, 0));
      setSleep((s) => Math.max(s - 5, 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (feed <= 0 || play <= 0 || sleep <= 0) {
      setIsAlive(false);
      navigate("/deathscreen");
    }
  }, [feed, play, sleep, navigate]);

  // Main functions
  function feedPet() {
    setFeed((f) => Math.min(f + 10, 100));
    afterFeed();
  }

  function playPet() {
    setPlay((p) => Math.min(p + 10, 100));
    setSleep((s) => Math.max(s - 5, 0));
    setFeed((f) => Math.max(f - 5, 0));
    afterPlay();
  }

  function sleepPet() {
    setSleep((s) => Math.min(s + 15, 100));
    afterSleep();
  }

  // Secondary functions that switch scenes (no timeout)
  function afterFeed() {
    console.log("Feeding pet!");
    setCurrentScene("feed");
  }

  function afterPlay() {
    console.log("Playing with pet!");
    setCurrentScene("play");
  }

  function afterSleep() {
    console.log("Pet is sleeping!");
    setCurrentScene("sleep");
  }

  // Function to render the appropriate component
  function renderScene() {
    switch (currentScene) {
      case "feed":
        return <Meal />; // Replace with your FeedComponent
      case "play":
        return <Bath />; // Replace with your PlayComponent
      case "sleep":
        return <Bed />; // Replace with your SleepComponent
      default:
        return <Default />;
    }
  }

  return (
    <div>
      <h2>{isAlive ? "My PixelPal" : "Your PixelPal has died."}</h2>
      {/* Render the current scene component */}

      {renderScene()}

      <div>
        <p>Food: {feed}</p>
        <p>Play: {play}</p>
        <p>Sleep: {sleep}</p>
      </div>

      {isAlive && (
        <div>
          <button onClick={feedPet}>Feed</button>
          <button onClick={playPet}>Play</button>
          <button onClick={sleepPet}>Sleep</button>
        </div>
      )}
    </div>
  );
}
