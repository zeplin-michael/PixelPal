import { useState } from "react";
import { usePet } from "../../api/PetContext";
import { useAuth } from "../../auth/AuthContext";
import "./ProfilePage.css";
import CreatePetForm from "./CreatePetForm/CreatePetForm";
import PetGrid from "./Profile/PetGrid";
import ToggleDeadButton from "./Profile/ToggleDeadButton";
import NoPetsMessage from "./Profile/NoPetsMessage";

export default function ProfilePage() {
  const { pets, loading, error } = usePet();
  const { token } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDead, setShowDead] = useState(false);

  if (error) return <div>Error: {error}</div>;

  if (!token) {
    return (
      <div className="profile-container">
        You are not logged in, please login to view your profile or create a
        pal!
      </div>
    );
    // If no pet, show create form
  }
  if (!pets) {
    return (
      <div className="profile-container">
        <h2>You don't have a pal yet!</h2>
        <CreatePetForm />
      </div>
    );
  }

  // Split pets into alive and dead
  const alivePets = pets.filter((pet) => !pet.dead);
  const deadPets = pets.filter((pet) => pet.dead);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>{showDead ? "Your Fallen Pals" : "Your Pals"}</h2>
        <ToggleDeadButton showDead={showDead} setShowDead={setShowDead} />
      </div>
      {showDead ? (
        deadPets.length > 0 ? (
          <PetGrid pets={deadPets} />
        ) : (
          <NoPetsMessage message="No fallen pals yet!" />
        )
      ) : alivePets.length > 0 ? (
        <PetGrid
          pets={alivePets}
          showAddButton
          onAddPet={() => setShowCreateModal(true)}
        />
      ) : (
        <NoPetsMessage
          message="You don't have a pal yet!"
          showAddButton
          onAddPet={() => setShowCreateModal(true)}
        />
      )}
      {showCreateModal && !showDead && (
        <CreatePetForm onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
