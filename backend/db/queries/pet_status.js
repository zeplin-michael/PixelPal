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
  petId,
}) {
  const sql = `UPDATE pet_status
     SET hunger = $1,
         cleanliness = $2,
         happiness = $3,
         energy = $4,
         health = $5
     WHERE pet_id = $6
     RETURNING *`;
  const {
    rows: [status],
  } = await db.query(sql, [
    hunger,
    cleanliness,
    happiness,
    energy,
    health,
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

  function minutesSince(timestamp) {
    if (!timestamp) return Number.MAX_SAFE_INTEGER;
    return Math.floor((now - new Date(timestamp)) / 60000);
  }

  const hungerLoss = Math.floor(minutesSince(current.last_fed_at) / 1); // slower
  const energyLoss = Math.floor(minutesSince(current.last_slept_at) / 2); // slower
  const cleanlinessLoss = Math.floor(
    minutesSince(current.last_cleaned_at) / 10
  ); // faster
  const happinessLoss = Math.floor(minutesSince(current.last_played_at) / 15); // faster

  const updated = {
    hunger: Math.max(current.hunger - hungerLoss, 0),
    cleanliness: Math.max(current.cleanliness - cleanlinessLoss, 0),
    happiness: Math.max(current.happiness - happinessLoss, 0),
    energy: Math.max(current.energy - energyLoss, 0),
    health: current.health,
  };
  // Pure average of the 4 core stats
  const averageStat =
    (updated.hunger +
      updated.cleanliness +
      updated.happiness +
      updated.energy) /
    4;

  // Only update health if at least one stat is below 100
  let newHealth = current.health;
  const allStatsAtMax =
    updated.hunger === 100 &&
    updated.cleanliness === 100 &&
    updated.happiness === 100 &&
    updated.energy === 100;

  if (!allStatsAtMax) {
    newHealth = Math.round(averageStat);
  }

  updated.health = newHealth;

  await db.query(
    `UPDATE pet_status
     SET hunger = $1,
         cleanliness = $2,
         happiness = $3,
         energy = $4,
         health = $5
     WHERE pet_id = $6`,
    [
      updated.hunger,
      updated.cleanliness,
      updated.happiness,
      updated.energy,
      updated.health,
      petId,
    ]
  );

  return { ...current, ...updated };
}
