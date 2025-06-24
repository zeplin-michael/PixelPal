import { useState, useEffect } from "react";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [petName, setPetName] = useState("PixelPal");
  const [coins, setCoins] = useState(500);
  const [feed, setFeed] = useState(100);
  const [play, setPlay] = useState(100);
  const [sleep, setSleep] = useState(100);
  const { token } = useAuth();
  // useEffect(() => {}, []);

  return (
    <>
      {token ? (
        <div className="profile-container">
          <h1>Welcome to Your Pal Profile</h1>
          <h2>{petName}</h2>

          <img
            src="/img/game-play/alien_idle_360.gif"
            alt="Your PixelPal"
            width="200"
          />

          <div className="profile-card">
            <h3 className="coin-balance">Coin Balance: ${coins}</h3>
            <p className="stats">Feed: {feed}</p>
            <p className="stats">Play: {play}</p>
            <p className="stats">Sleep: {sleep}</p>
          </div>
        </div>
      ) : (
        <div>
          <h1>You are not logged in</h1>
        </div>
      )}
    </>
  );
}
