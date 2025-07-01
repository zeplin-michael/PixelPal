import React from "react";

export default function NoPetsMessage({ message, showAddButton, onAddPet }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ margin: "2rem" }}>{message}</p>
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
