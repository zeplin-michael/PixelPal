import React, { useState } from "react";
import { AVATAR_META, getAvatarActionImg } from "../../utils/avatarMeta";
import "./AvatarSelector.css";
import ModalOverlay from "../../../General-Components/Modal/ModalOverlay";

const AVATAR_OPTIONS = Object.entries(AVATAR_META).map(([value, meta]) => ({
  label: value.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
  value,
  img: getAvatarActionImg(value, "idle"),
}));

function AvatarSelector({ avatar, setAvatar, disabled }) {
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

  return (
    <div className="avatar-popup-selector">
      <button
        type="button"
        className="avatar-select-btn"
        onClick={() => setShowAvatarPopup(true)}
        disabled={disabled}
      >
        <img
          src={getAvatarActionImg(avatar, "idle")}
          alt="Selected avatar"
          className="avatar-img"
        />
        <span>Select Avatar</span>
      </button>
      {showAvatarPopup && (
        <ModalOverlay onClose={() => setShowAvatarPopup(false)}>
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
                <img src={opt.img} alt={opt.label} className="avatar-img" />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}

export default AvatarSelector;
