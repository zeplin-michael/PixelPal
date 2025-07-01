import React, { useState } from "react";
import { Link } from "react-router";
import useQuery from "../../../api/useQuery";
import { getAvatarActionImg } from "../../utils/avatarMeta";
import StatsInfoModal from "./StatsInfoModal";

function AlivePetProfile({ pet }) {
  const [showStatsInfo, setShowStatsInfo] = useState(false);

  return (
    <div className="pet-profile">
      <button
        className="stats-info-btn"
        aria-label="What do these stats mean?"
        onClick={() => setShowStatsInfo(true)}
        tabIndex={0}
      >
        ?
      </button>
      <h3>{pet.name}</h3>
      <img
        src={getAvatarActionImg(pet.avatar_url, "idle")}
        alt={`${pet.name} avatar`}
        className="pet-profile-avatar"
        style={{ width: "80px", height: "80px", marginBottom: "0.5rem" }}
      />
      <p>Health: {pet.health}</p>
      <p>Hunger: {pet.hunger}</p>
      <p>Cleanliness: {pet.cleanliness}</p>
      <p>Happiness: {pet.happiness}</p>
      <p>Energy: {pet.energy}</p>
      <p>Coins: {pet.coins}</p>
      <Link to="/pal">Play</Link>
      {showStatsInfo && (
        <StatsInfoModal onClose={() => setShowStatsInfo(false)} />
      )}
    </div>
  );
}

export default AlivePetProfile;
