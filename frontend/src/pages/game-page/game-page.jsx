import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react";
import { BathTime } from "./img/PixelPals/bathtime.png";

/** The gameplay page */

export default function Bath() {
  return (
    <div>
      <h1>Bath Time</h1>
      <img src={BathTime} alt="bath time image" />
      <button>Back</button>
    </div>
  );
}
console.log(bathtime);
