import React from "react";
import "./ProfilePage.css";
import { Link } from "react-router";

function PetProfile({ pet }) {
  return (
    <div className="pet-profile">
      {pet.dead && <div className="dead-pet">🪦</div>}

      <h3>{pet.name}</h3>
      <p>Health: {pet.health}</p>
      <p>Hunger: {pet.hunger}</p>
      <p>Cleanliness: {pet.cleanliness}</p>
      <p>Happiness: {pet.happiness}</p>
      <p>Energy: {pet.energy}</p>
      <p>Coins: {pet.coins}</p>
      <Link to="/pal">Play</Link>
    </div>
  );
}

export default PetProfile;
