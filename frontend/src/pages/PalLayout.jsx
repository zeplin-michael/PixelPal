import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./PalLayout.css";
import { usePet } from "../api/PetContext";
import useMutation from "../api/useMutation";

import Bath from "./game-page/components/bath";
import Bed from "./game-page/components/bed";
import Meal from "./game-page/components/meal";
import Default from "./game-page/components/default";
import CreatePetForm from "./ProfilePage/CreatePetForm";

export default function PalLayout() {
  const navigate = useNavigate();
  const { pet, loading, error, refreshPet } = usePet();

  // Mutations for each action
  const { mutate: feedPet, loading: feeding } = useMutation(
    "PUT",
    pet ? `/pets/${pet.id}/feed` : null,
    []
  );
  const { mutate: playPet, loading: playing } = useMutation(
    "PUT",
    pet ? `/pets/${pet.id}/play` : null,
    []
  );
  const { mutate: sleepPet, loading: sleeping } = useMutation(
    "PUT",
    pet ? `/pets/${pet.id}/sleep` : null,
    []
  );
  const { mutate: cleanPet, loading: cleaning } = useMutation(
    "PUT",
    pet ? `/pets/${pet.id}/clean` : null,
    []
  );

  // Track which scene to show (optional, you can keep this local)
  const [currentScene, setCurrentScene] = useState(null);

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
  }
  async function handlePlay() {
    await playPet();
    setCurrentScene("play");
    refreshPet();
  }
  async function handleSleep() {
    await sleepPet();
    setCurrentScene("sleep");
    refreshPet();
  }
  async function handleClean() {
    await cleanPet();
    setCurrentScene("clean");
    refreshPet();
  }

  function renderScene() {
    switch (currentScene) {
      case "feed":
        return <Meal />;
      case "clean":
        return <Bath />;
      case "sleep":
        return <Bed />;
      default:
        return <Default />;
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
