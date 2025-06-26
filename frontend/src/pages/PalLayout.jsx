import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./PalLayout.css";
import { usePet } from "../api/PetContext";
import useMutation from "../api/useMutation";
import useIncrementOverallStat from "../api/useIncrementOverallStat";

import Clean from "./game-page/components/clean";
import Sleep from "./game-page/components/sleep";
import Feed from "./game-page/components/feed";
import Play from "./game-page/components/play";
import Default from "./game-page/components/default";
import CreatePetForm from "./ProfilePage/CreatePetForm";

export default function PalLayout() {
  const navigate = useNavigate();
  const { pet, loading, error, refreshPet } = usePet();

  // Mutations for each action
  const { mutate: feedPet, loading: feeding } = useMutation(
    "PUT",
    pet ? `/pets/${pet.user_id}/feed` : null,
    []
  );
  const { mutate: playPet, loading: playing } = useMutation(
    "PUT",
    pet ? `/pets/${pet.user_id}/play` : null,
    []
  );
  const { mutate: sleepPet, loading: sleeping } = useMutation(
    "PUT",
    pet ? `/pets/${pet.user_id}/sleep` : null,
    []
  );
  const { mutate: cleanPet, loading: cleaning } = useMutation(
    "PUT",
    pet ? `/pets/${pet.user_id}/clean` : null,
    []
  );

  // Track which scene to show (optional, you can keep this local)
  const [currentScene, setCurrentScene] = useState(null);

  // Increment overall stats
  const [incrementStat, incrementing, incrementError] = useIncrementOverallStat(
    pet ? pet.id : null
  );

  // Redirect to deathscreen if pet is dead
  useEffect(() => {
    if (pet && pet.dead) {
      navigate("/deathscreen");
    }
  }, [pet, navigate]);

  // Action handlers
  async function handleFeed() {
    await feedPet();
    setCurrentScene("feed");
    refreshPet();
    await incrementStat("total_meals");
  }
  async function handlePlay() {
    await playPet();
    setCurrentScene("play");
    refreshPet();
    await incrementStat("total_play_sessions");
  }
  async function handleSleep() {
    await sleepPet();
    setCurrentScene("sleep");
    refreshPet();
    await incrementStat("total_sleep_sessions");
  }
  async function handleClean() {
    await cleanPet();
    setCurrentScene("clean");
    refreshPet();
    await incrementStat("total_baths");
  }

  function renderScene() {
    switch (currentScene) {
      case "feed":
        return <Feed avatar={pet.avatar_url} />;
      case "clean":
        return <Clean avatar={pet.avatar_url} />;
      case "sleep":
        return <Sleep avatar={pet.avatar_url} />;
      case "play":
        return <Play avatar={pet.avatar_url} />;
      default:
        return <Default avatar={pet.avatar_url} />;
    }
  }

  // Loading and error states
  if (loading && !pet) return <div>Loading your pet...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pet) return <CreatePetForm />;

  return (
    <div className="layout">
      <div className="scene-container">
        {renderScene()}
        <div className="stats-bar">
          <p>💗 Health: {pet.health}</p>
          <p>🍔 Food: {pet.hunger}</p>
          <p>🎲 Play: {pet.happiness}</p>
          <p>🛏️ Sleep: {pet.energy}</p>
          <p>🛁 Bath: {pet.cleanliness}</p>
        </div>
      </div>
      {!pet.dead && (
        <div className="button-row">
          <button onClick={handleFeed} disabled={feeding}>
            Feed
          </button>
          <button onClick={handlePlay} disabled={playing}>
            Play
          </button>
          <button onClick={handleSleep} disabled={sleeping}>
            Sleep
          </button>
          <button onClick={handleClean} disabled={cleaning}>
            Clean
          </button>
        </div>
      )}
    </div>
  );
}
