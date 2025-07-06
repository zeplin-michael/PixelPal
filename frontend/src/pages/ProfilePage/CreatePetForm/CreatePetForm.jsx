import React, { useState } from "react";
import "./CreatePetForm.css";
import { usePet } from "../../../api/PetContext";
import useMutation from "../../../api/useMutation";
import ModalOverlay from "../../../General-Components/Modal/ModalOverlay";
import AvatarSelector from "./AvatarSelector";

function CreatePetForm({ onClose }) {
  const { refreshPets } = usePet();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("green_alien"); // Default avatar
  const { mutate, loading, error } = useMutation("POST", "/pets", []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await mutate({ name, avatar });
    if (success) {
      await refreshPets();
      setName("");
      if (onClose) onClose();
    }
  };

  return (
    <ModalOverlay onClose={onClose}>
      <form onSubmit={handleSubmit} className="create-pet-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pet name"
          required
          disabled={loading}
          autoFocus
        />
        <AvatarSelector
          avatar={avatar}
          setAvatar={setAvatar}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Pal"}
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </ModalOverlay>
  );
}

export default CreatePetForm;
