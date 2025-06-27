import React, { useState } from "react";
import "./ProfilePage.css";
import { usePet } from "../../api/PetContext";
import useMutation from "../../api/useMutation";
import { AVATAR_META, getAvatarActionImg } from "../utils/avatarMeta";

const AVATAR_OPTIONS = Object.entries(AVATAR_META).map(([value, meta]) => ({
  label: value.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
  value,
  img: getAvatarActionImg(value, "idle"),
}));

function CreatePetForm({ onClose }) {
  const { refreshPets } = usePet();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0].value);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

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

  // Close modal on overlay click
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      if (onClose) onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content animate-modal">
        <button
          className="modal-close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="create-pet-form">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Pet name"
            required
            disabled={loading}
            autoFocus
          />
          <div className="avatar-popup-selector">
            <button
              type="button"
              className="avatar-select-btn"
              onClick={() => setShowAvatarPopup(true)}
              disabled={loading}
            >
              <img
                src={getAvatarActionImg(avatar, "idle")}
                alt="Selected avatar"
                className="avatar-img"
              />
              <span>Select Avatar</span>
            </button>
            {showAvatarPopup && (
              <div
                className="avatar-popup-overlay"
                onClick={() => setShowAvatarPopup(false)}
              >
                <div
                  className="avatar-popup"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h4>Choose Your Avatar</h4>
                  <div className="avatar-popup-list">
                    {AVATAR_OPTIONS.map((opt) => (
                      <button
                        type="button"
                        key={opt.value}
                        className={`avatar-popup-option${
                          avatar === opt.value ? " selected" : ""
                        }`}
                        onClick={() => {
                          setAvatar(opt.value);
                          setShowAvatarPopup(false);
                        }}
                      >
                        <img
                          src={opt.img}
                          alt={opt.label}
                          className="avatar-img"
                        />
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    className="avatar-popup-close"
                    type="button"
                    onClick={() => setShowAvatarPopup(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Pal"}
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default CreatePetForm;
