import React, { useState } from "react";
import { Link } from "react-router";
import { useSelectedPet } from "../../../api/SelectedPetContext";
import "./AlivePetProfile.css";
import { getAvatarActionImg } from "../../utils/avatarMeta";

function AlivePetProfile({ pet, onShowStats }) {
  const { selectedPet, setSelectedPet } = useSelectedPet();

  return (
    <div
      className={`pet-profile ${selectedPet?.id === pet.id ? "selected" : ""}`}
      onClick={() => {
        if (!selectedPet || selectedPet.id !== pet.id) {
          setSelectedPet(pet);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Select ${pet.name}`}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && setSelectedPet(pet)
      }
    >
      <button
        className="stats-info-btn"
        aria-label="What do these stats mean?"
        onClick={(e) => {
          e.stopPropagation();
          onShowStats();
        }}
        tabIndex={0}
      >
        ?
      </button>
      <h3>{pet.name}</h3>
      <img
        src={getAvatarActionImg(pet.avatar_url, "idle")}
        alt={`${pet.name} avatar`}
        className="pet-profile-avatar"
        style={{ width: "80px", height: "80px", marginBottom: "0.5rem" }}
      />
      <p>Health: {pet.health}</p>
      <p>Hunger: {pet.hunger}</p>
      <p>Cleanliness: {pet.cleanliness}</p>
      <p>Happiness: {pet.happiness}</p>
      <p>Energy: {pet.energy}</p>

      <Link to="/pal">Play</Link>
    </div>
  );
}

export default AlivePetProfile;
