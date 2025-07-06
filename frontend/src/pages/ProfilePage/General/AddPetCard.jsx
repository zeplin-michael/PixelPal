import React from "react";
import "./AddPetCard.css";
export default function AddPetCard({ onAddPet }) {
  return (
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
  );
}
