import React from "react";

const STAT_DESCRIPTIONS = {
  health: "Overall well-being of your pet. If it drops to 0, your pet dies.",
  hunger: "How full your pet is. Feed your pet to keep this high.",
  cleanliness: "How clean your pet is. Bathe your pet to increase this.",
  happiness: "How happy your pet is. Play with your pet to boost this.",
  energy: "How rested your pet is. Let your pet sleep to restore energy.",
  coins:
    "Your current coin balance. Earn coins by playing and caring for your pet.",
};

function StatsInfoModal({ onClose }) {
  return (
    <div className="stats-info-modal" onClick={onClose}>
      <div className="stats-info-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="stats-info-close"
          aria-label="Close"
          onClick={onClose}
        >
          &times;
        </button>
        <h4>What do these stats mean?</h4>
        <ul>
          {Object.entries(STAT_DESCRIPTIONS).map(([stat, desc]) => (
            <li key={stat}>
              <strong>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</strong>{" "}
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StatsInfoModal;
