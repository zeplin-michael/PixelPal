import { useState } from "react";
import { usePet } from "../../api/PetContext";
import { useAuth } from "../../auth/AuthContext";
import { useSelectedPet } from "../../api/SelectedPetContext";
import "./ProfilePage.css";
import CreatePetForm from "./CreatePetForm/CreatePetForm";
import PetGrid from "./Profile/PetGrid";
import ToggleDeadButton from "./Profile/ToggleDeadButton";
import NoPetsMessage from "./Profile/NoPetsMessage";
import { Link } from "react-router";

export default function ProfilePage() {
  const { pets, loading, error } = usePet();
  const { token } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDead, setShowDead] = useState(false);
  const { setSelectedPet, selectedPet } = useSelectedPet();

  if (error) return <div>Error: {error}</div>;

  const handleGridClick = (e) => {
    // Only deselect if the click is directly on the profile container, not a child
    if (e.target === e.currentTarget) {
      if (selectedPet !== null) {
        setSelectedPet(null);
      }
    }
  };

  if (!token) {
    return (
      <div className="profile-container">
        <div className="login-link">
          <Link to="/login">
            <h4>
              You are not logged in, please login to view your profile or create
              a pal!
            </h4>
          </Link>
        </div>
      </div>
    );
    // If no pet, show create form
  }
  if (!pets) {
    return (
      <div className="profile-container">
        <CreatePetForm />
      </div>
    );
  }

  // Split pets into alive and dead
  const alivePets = pets.filter((pet) => !pet.dead);
  const deadPets = pets.filter((pet) => pet.dead);

  return (
    <div className="profile-container" onClick={handleGridClick}>
      <div className="profile-header" onClick={handleGridClick}>
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
        <CreatePetForm
          onClose={() => {
            setShowCreateModal(false);
            setSelectedPet(null);
          }}
        />
      )}
    </div>
  );
}
