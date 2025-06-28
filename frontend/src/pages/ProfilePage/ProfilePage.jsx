import { useState } from "react";
import { usePet } from "../../api/PetContext";
import { useAuth } from "../../auth/AuthContext";
import "./ProfilePage.css";
import CreatePetForm from "./CreatePetForm";
import PetProfile from "./PetProfile";

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
  const alivePets = pets ? pets.filter((pet) => !pet.dead) : [];
  const deadPets = pets ? pets.filter((pet) => pet.dead) : [];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>{showDead ? "Your Fallen Pals" : "Your Pals"}</h2>
        <button
          className="toggle-dead-btn"
          aria-label={showDead ? "Show alive pets" : "Show dead pets"}
          onClick={() => setShowDead((v) => !v)}
          tabIndex={0}
        >
          <span
            role="img"
            aria-label={showDead ? "Show alive pets" : "Show dead pets"}
          >
            {showDead ? "❤️" : "🪦"}
          </span>
          <span className="toggle-dead-tooltip">
            {showDead ? "Show alive pets" : "Show dead pets"}
          </span>
        </button>
      </div>
      <div className="pet-grid">
        {showDead ? (
          deadPets.length > 0 ? (
            deadPets.map((pet) => <PetProfile key={pet.id} pet={pet} />)
          ) : (
            <div style={{ gridColumn: "1/-1", textAlign: "center" }}>
              <p>No fallen pals yet!</p>
            </div>
          )
        ) : alivePets.length > 0 ? (
          <>
            {alivePets.map((pet) => (
              <PetProfile key={pet.id} pet={pet} />
            ))}
            <button
              className="add-pet-card"
              aria-label="Add new pet"
              onClick={() => setShowCreateModal(true)}
              tabIndex={0}
            >
              <span className="add-pet-plus" aria-hidden="true">
                +
              </span>
              <span className="add-pet-label">Add Pal</span>
            </button>
          </>
        ) : (
          <div style={{ gridColumn: "1/-1", textAlign: "center" }}>
            <p style={{ marginBottom: "2rem" }}>You don't have a pal yet!</p>
            <button
              className="add-pet-card"
              aria-label="Add new pet"
              onClick={() => setShowCreateModal(true)}
              tabIndex={0}
            >
              <span className="add-pet-plus" aria-hidden="true">
                +
              </span>
              <span className="add-pet-label">Add Pal</span>
            </button>
          </div>
        )}
      </div>
      {showCreateModal && !showDead && (
        <CreatePetForm onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
