import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function PalLayout() {
  const navigate = useNavigate();

  const [feed, setFeed] = useState(100);
  const [play, setPlay] = useState(100);
  const [sleep, setSleep] = useState(100);
  const [clean, setClean] = useState(100);
  const [isAlive, setIsAlive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeed((f) => Math.max(f - 5, 0));
      setPlay((p) => Math.max(p - 5, 0));
      setSleep((s) => Math.max(s - 5, 0));
      setClean((c) => Math.max(c - 5, 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (feed <= 0 || play <= 0 || sleep <= 0 || clean <= 0) {
      setIsAlive(false);
      navigate("/deathscreen");
    }
  }, [feed, play, sleep, clean, navigate]);

  function feedPet() {
    setFeed((f) => Math.min(f + 10, 100));
  }

  function playPet() {
    setPlay((p) => Math.min(p + 10, 100));
    setSleep((s) => Math.max(s - 5, 0));
    setFeed((f) => Math.max(f - 5, 0));
  }

  function sleepPet() {
    setSleep((s) => Math.min(s + 15, 100));
  }

  function cleanPet() {
    setClean((c) => Math.min(c + 10, 100));
    setSleep((s) => Math.max(s - 5, 0));
    setFeed((f) => Math.max(f - 5, 0));
  }

  return (
    <div>
      <h2>{isAlive ? "My PixelPal" : "Your PixelPal has died."}</h2>

      <div>
        <p>Food: {feed}</p>
        <p>Play: {play}</p>
        <p>Sleep: {sleep}</p>
        <p>Bath: {clean}</p>
      </div>

      {isAlive && (
        <div>
          <button onClick={feedPet}>Feed</button>
          <button onClick={playPet}>Play</button>
          <button onClick={sleepPet}>Sleep</button>
          <button onClick={cleanPet}>Clean</button>
        </div>
      )}
    </div>
  );
}
