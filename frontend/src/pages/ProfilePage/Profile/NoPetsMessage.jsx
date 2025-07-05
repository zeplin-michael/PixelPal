import React from "react";
import "./NoPetsMessage.css";

export default function NoPetsMessage({ message, showAddButton, onAddPet }) {
  return (
    <div className="no-pets-message">
      <h2 style={{ margin: "2rem" }}>{message}</h2>
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
