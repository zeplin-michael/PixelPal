import React, { useState } from "react";
import "./ProfilePage.css";
import { usePet } from "../../api/PetContext";
import useMutation from "../../api/useMutation";

function CreatePetForm() {
  const { refreshPet } = usePet();
  const [name, setName] = useState("");

  // Set up the mutation: method, endpoint, tags to invalidate (if any)
  const { mutate, loading, error } = useMutation(
    "POST",
    "/pets",
    [] // You could add a tag like ["pet"] if your useQuery uses tags
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await mutate({ name });
    if (success) {
      await refreshPet(); // Refetch pet after creation
      setName(""); // Optionally clear the input
    }
    // error is handled by the hook
  };

  return (
    <form onSubmit={handleSubmit} className="create-pet-form">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Pet name"
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Pal"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}

export default CreatePetForm;
