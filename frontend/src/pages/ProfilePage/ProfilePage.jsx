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

  // If pet exists, show pet profile
  return (
    <div className="profile-container">
      <h2>Your Pals</h2>
      <div className="pet-grid">
        {pets && pets.length > 0 ? (
          pets.map((pet) => <PetProfile key={pet.id} pet={pet} />)
        ) : (
          <div style={{ gridColumn: "1/-1", textAlign: "center" }}>
            <p>You don't have a pal yet!</p>
          </div>
        )}
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
      {showCreateModal && (
        <CreatePetForm onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
