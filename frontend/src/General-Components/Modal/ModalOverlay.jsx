import React from "react";
import "./ModalOverlay.css";
function ModalOverlay({ onClose, children }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      if (onClose) onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-content animate-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default ModalOverlay;
