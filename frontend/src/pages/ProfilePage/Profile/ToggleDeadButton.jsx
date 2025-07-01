import React from "react";

export default function ToggleDeadButton({ showDead, setShowDead }) {
  return (
    <button
      className="toggle-dead-btn"
      aria-label={showDead ? "Show alive pets" : "Show dead pets"}
      onClick={() => setShowDead((v) => !v)}
      tabIndex={0}
    >
      <span
        role="img"
        aria-label={showDead ? "Show alive pets" : "Show dead pets"}
      >
        {showDead ? "❤️" : "🪦"}
      </span>
      <span className="toggle-dead-tooltip">
        {showDead ? "Show alive pets" : "Show dead pets"}
      </span>
    </button>
  );
}
