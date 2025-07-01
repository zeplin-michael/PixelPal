import React from "react";
import useQuery from "../../../api/useQuery";
import { getAvatarActionImg } from "../../utils/avatarMeta";

function DeadPetProfile({ pet }) {
  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
  } = useQuery(
    pet ? `/pet_overall_stats/${pet.id}` : null,
    pet ? `overallStats-${pet.id}` : null
  );

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

export default DeadPetProfile;
