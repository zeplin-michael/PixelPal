import React, { useState } from "react";
import "./ProfilePage.css";
import { Link } from "react-router";
import useQuery from "../../api/useQuery";
import { getAvatarActionImg } from "../utils/avatarMeta";

const STAT_DESCRIPTIONS = {
  health: "Overall well-being of your pet. If it drops to 0, your pet dies.",
  hunger: "How full your pet is. Feed your pet to keep this high.",
  cleanliness: "How clean your pet is. Bathe your pet to increase this.",
  happiness: "How happy your pet is. Play with your pet to boost this.",
  energy: "How rested your pet is. Let your pet sleep to restore energy.",
  coins:
    "Your current coin balance. Earn coins by playing and caring for your pet.",
};

function PetProfile({ pet }) {
  const [showStatsInfo, setShowStatsInfo] = useState(false);
  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
  } = useQuery(
    pet ? `/pet_overall_stats/${pet.id}` : null,
    pet ? `overallStats-${pet.id}` : null
  );

  if (pet.dead) {
    return (
      <div className="pet-profile dead-pet-card">
        <img
          src={getAvatarActionImg(pet.avatar_url, "death")}
          alt="Pet tombstone"
          className="pet-profile-avatar"
          style={{ width: "80px", height: "80px", marginBottom: "0.5rem" }}
        />
        <h4>{pet.name}'s Lifetime Stats</h4>
        {statsLoading && <div>Loading stats...</div>}
        {statsError && <div style={{ color: "red" }}>Error loading stats</div>}
        {stats && (
          <ul>
            <li>Total Meals: {stats.total_meals}</li>
            <li>Total Baths: {stats.total_baths}</li>
            <li>Total Play Sessions: {stats.total_play_sessions}</li>
            <li>Total Sleep Sessions: {stats.total_sleep_sessions}</li>
            <li>Days Alive: {stats.days_alive}</li>
          </ul>
        )}
      </div>
    );
  }

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
        <div
          className="stats-info-modal"
          onClick={() => setShowStatsInfo(false)}
        >
          <div
            className="stats-info-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="stats-info-close"
              aria-label="Close"
              onClick={() => setShowStatsInfo(false)}
            >
              &times;
            </button>
            <h4>What do these stats mean?</h4>
            <ul>
              {Object.entries(STAT_DESCRIPTIONS).map(([stat, desc]) => (
                <li key={stat}>
                  <strong>
                    {stat.charAt(0).toUpperCase() + stat.slice(1)}:
                  </strong>{" "}
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetProfile;
