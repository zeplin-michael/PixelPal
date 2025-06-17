import React from "react";
import { BathTime } from "./img/game-play/BathTime.png";
import "./bath.css";

function bath() {
  return (
    <div>
      <h1>BATH TIME</h1>
      <div>
        <img className="scene" src={BathTime} alt="bath time img" />
      </div>
    </div>
  );
}

export default bath;
