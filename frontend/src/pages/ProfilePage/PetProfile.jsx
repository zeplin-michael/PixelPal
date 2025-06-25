import React from "react";
import "./ProfilePage.css";
import { Link } from "react-router";
import useQuery from "../../api/useQuery";

function PetProfile({ pet }) {
  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
  } = useQuery(
    pet ? `/pet_overall_stats/${pet.id}` : null,
    pet ? `overallStats-${pet.id}` : null
  );

  return (
    <>
      {pet.dead ? (
        <>
          <div className="dead-pet">🪦</div>
          <div className="dead-pet-stats">
            <h4>{pet.name}'s Lifetime Stats</h4>

            {statsLoading && <div>Loading stats...</div>}
            {statsError && (
              <div style={{ color: "red" }}>Error loading stats</div>
            )}
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
        </>
      ) : (
        <>
          <div className="pet-profile">
            <h3>{pet.name}</h3>
            <p>Health: {pet.health}</p>
            <p>Hunger: {pet.hunger}</p>
            <p>Cleanliness: {pet.cleanliness}</p>
            <p>Happiness: {pet.happiness}</p>
            <p>Energy: {pet.energy}</p>
            <p>Coins: {pet.coins}</p>
            <Link to="/pal">Play</Link>
          </div>
        </>
      )}
    </>
  );
}

export default PetProfile;
