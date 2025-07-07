import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./PalLayout.css";
import { useSelectedPet } from "../../api/SelectedPetContext";
import { usePet } from "../../api/PetContext";
import useMutation from "../../api/useMutation";

import Clean from "./components/clean";
import Sleep from "./components/sleep";
import Feed from "./components/feed";
import Play from "./components/play";
import Default from "./components/default";
import CreatePetForm from "../ProfilePage/CreatePetForm/CreatePetForm";

export default function PalLayout() {
  const navigate = useNavigate();
  const { pets, refreshPets } = usePet();
  const { selectedPet, setSelectedPet } = useSelectedPet();
  // Track which scene to show (optional, you can keep this local)
  const [currentScene, setCurrentScene] = useState(null);

  // Redirect to deathscreen if pet is dead
  useEffect(() => {
    if (selectedPet && selectedPet.dead) {
      navigate("/deathscreen");
    }
  }, [selectedPet, navigate]);

  // Sync selectedPet with latest pets array
  useEffect(() => {
    if (!selectedPet || !pets) return;
    const updated = pets.find((p) => p.id === selectedPet.id);
    if (updated && updated !== selectedPet) {
      setSelectedPet(updated);
    }
  }, [pets, selectedPet, setSelectedPet]);
  // Mutations for each action
  const { mutate: feedPet, loading: feeding } = useMutation(
    "PUT",
    selectedPet ? `/pets/${selectedPet.id}/feed` : null,
    []
  );
  const { mutate: playPet, loading: playing } = useMutation(
    "PUT",
    selectedPet ? `/pets/${selectedPet.id}/play` : null,
    []
  );
  const { mutate: sleepPet, loading: sleeping } = useMutation(
    "PUT",
    selectedPet ? `/pets/${selectedPet.id}/sleep` : null,
    []
  );
  const { mutate: cleanPet, loading: cleaning } = useMutation(
    "PUT",
    selectedPet ? `/pets/${selectedPet.id}/clean` : null,
    []
  );

  // Action handlers
  async function handleFeed() {
    await feedPet();
    setCurrentScene("feed");
    refreshPets();
  }
  async function handlePlay() {
    await playPet();
    setCurrentScene("play");
    refreshPets();
  }
  async function handleSleep() {
    await sleepPet();
    setCurrentScene("sleep");
    refreshPets();
  }
  async function handleClean() {
    await cleanPet();
    setCurrentScene("clean");
    refreshPets();
  }

  function renderScene() {
    switch (currentScene) {
      case "feed":
        return <Feed avatar={selectedPet.avatar_url} />;
      case "clean":
        return <Clean avatar={selectedPet.avatar_url} />;
      case "sleep":
        return <Sleep avatar={selectedPet.avatar_url} />;
      case "play":
        return <Play avatar={selectedPet.avatar_url} />;
      default:
        return <Default avatar={selectedPet.avatar_url} />;
    }
  }

  if (!selectedPet) return <CreatePetForm />;

  return (
    <div className="layout">
      <div className="scene-container">
        {renderScene()}
        <div className="stats-bar">
          <p>💗 Health: {selectedPet.health}</p>
          <p>🍔 Food: {selectedPet.hunger}</p>
          <p>🎲 Play: {selectedPet.happiness}</p>
          <p>🛏️ Sleep: {selectedPet.energy}</p>
          <p>🛁 Bath: {selectedPet.cleanliness}</p>
        </div>
      </div>
      {!selectedPet.dead && (
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
