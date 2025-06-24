import React from "react";
import "./ProfilePage.css";

function PetProfile({ pet }) {
  return (
    <div className="pet-profile">
      <h3>{pet.name}</h3>
      <p>Health: {pet.health}</p>
      <p>Hunger: {pet.hunger}</p>
      <p>Cleanliness: {pet.cleanliness}</p>
      <p>Happiness: {pet.happiness}</p>
      <p>Energy: {pet.energy}</p>
      <p>Coins: {pet.coins}</p>
    </div>
  );
}

export default PetProfile;
