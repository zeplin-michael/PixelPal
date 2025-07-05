import React from "react";
import PetProfile from "../PetProfile/PetProfile";
import { useSelectedPet } from "../../../api/SelectedPetContext";
import "./PetGrid.css";

export default function PetGrid({ pets, showAddButton, onAddPet }) {
  const { setSelectedPet, selectedPet } = useSelectedPet();

  // Handler for clicks on the grid background
  const handleGridClick = (e) => {
    // Only deselect if the click is directly on the grid, not a child
    if (e.target === e.currentTarget) {
      if (selectedPet !== null) {
        setSelectedPet(null);
      }
    }
  };

  return (
    <div className="pet-grid" onClick={handleGridClick}>
      {pets.map((pet) => (
        <PetProfile key={pet.id} pet={pet} />
      ))}
      {showAddButton && (
        <button
          className="add-pet-card"
          aria-label="Add new pet"
          onClick={onAddPet}
          tabIndex={0}
        >
          <span className="add-pet-plus" aria-hidden="true">
            +
          </span>
          <span className="add-pet-label">Add Pal</span>
        </button>
      )}
    </div>
  );
}
