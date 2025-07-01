import React from "react";
import PetProfile from "../PetProfile/PetProfile";

export default function PetGrid({ pets, showAddButton, onAddPet }) {
  return (
    <div className="pet-grid">
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
