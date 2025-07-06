import React from "react";
import "./NoPetsMessage.css";
import AddPetCard from "../General/AddPetCard";

export default function NoPetsMessage({ message, showAddButton, onAddPet }) {
  return (
    <div className="no-pets-message">
      <h2 style={{ margin: "2rem" }}>{message}</h2>
      {showAddButton && <AddPetCard onAddPet={onAddPet} />}
    </div>
  );
}
