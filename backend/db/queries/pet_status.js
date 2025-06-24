import db from "#db/client";

// pulls pet status
export async function getPetStatusByPetId(petId) {
  const sql = `SELECT * FROM pet_status WHERE pet_id = $1`;
  const {
    rows: [status],
  } = await db.query(sql, [petId]);
  return status;
}

// updates every status
// check if throws error=====================
export async function updatePetStatus({
  hunger,
  cleanliness,
  happiness,
  energy,
  health,
  dead,
  petId,
}) {
  const sql = `UPDATE pet_status
     SET hunger = $1,
         cleanliness = $2,
         happiness = $3,
         energy = $4,
         health = $5,
         dead = $6
     WHERE pet_id = $7
     RETURNING *`;
  const {
    rows: [status],
  } = await db.query(sql, [
    hunger,
    cleanliness,
    happiness,
    energy,
    health,
    dead,
    petId,
  ]);
  return status;
}

// add a calculation to make decay affect health======================

export async function decayPetStatusIfNeeded(petId) {
  const sql = `SELECT * FROM pet_status WHERE pet_id = $1`;
  const { rows } = await db.query(sql, [petId]);
  if (!rows[0]) return null;

  const now = new Date();
  const current = rows[0];

  const decayRates = {
    hunger: 0.2,
    cleanliness: 0.4,
    happiness: 1.0,
    energy: 0.3,
  };

  function minutesSince(timestamp) {
    if (!timestamp) return Number.MAX_SAFE_INTEGER;
    return Math.floor((now - new Date(timestamp)) / 60000);
  }

  const updated = {
    hunger: Math.max(
      current.hunger - minutesSince(current.last_fed_at) * decayRates.hunger,
      0
    ),
    cleanliness: Math.max(
      current.cleanliness -
        minutesSince(current.last_cleaned_at) * decayRates.cleanliness,
      0
    ),
    happiness: Math.max(
      current.happiness -
        minutesSince(current.last_played_at) * decayRates.happiness,
      0
    ),
    energy: Math.max(
      current.energy - minutesSince(current.last_slept_at) * decayRates.energy,
      0
    ),
    health: current.health,
    dead: current.dead,
  };

  // Base health as average of core stats
  let health =
    (updated.hunger +
      updated.cleanliness +
      updated.happiness +
      updated.energy) /
    4;

  // 💀 Apply penalties for any stat that hit 0
  const penaltyPerZeroStat = 5;
  const zeroStats = ["hunger", "cleanliness", "happiness", "energy"].filter(
    (stat) => updated[stat] === 0
  ).length;

  health -= penaltyPerZeroStat * zeroStats;

  updated.health = Math.round(Math.min(Math.max(health, 0), 100));
  updated.dead = updated.health <= 0;

  await db.query(
    `UPDATE pet_status
     SET hunger = $1,
         cleanliness = $2,
         happiness = $3,
         energy = $4,
         health = $5,
         dead = $6
     WHERE pet_id = $7`,
    [
      updated.hunger,
      updated.cleanliness,
      updated.happiness,
      updated.energy,
      updated.health,
      updated.dead,
      petId,
    ]
  );

  return { ...current, ...updated };
}
