import { useState, useEffect } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [petName, setPetName] = useState("PixelPal");
  const [coins, setCoins] = useState(500);
  const [feed, setFeed] = useState(100);
  const [play, setPlay] = useState(100);
  const [sleep, setSleep] = useState(100);

  // useEffect(() => {}, []);

  return (
    <div className="profile-container">
      <h1>Welcome to Your Pal Profile</h1>
      <h2>{petName}</h2>

      <img
        src="/img/game-play/alien_idle_360.gif"
        alt="Your PixelPal"
        width="200"
      />

      <div className="profile-card">
        <h3>Coin Balance: ${coins}</h3>
        <p>Feed: {feed}</p>
        <p>Play: {play}</p>
        <p>Sleep: {sleep}</p>
      </div>
    </div>
  );
}
