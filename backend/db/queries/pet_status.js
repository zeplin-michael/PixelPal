import db from "#db/client";

function parsePetStatus(status) {
  if (!status) return status;
  return {
    ...status,
    hunger: Number(status.hunger),
    cleanliness: Number(status.cleanliness),
    happiness: Number(status.happiness),
    energy: Number(status.energy),
    health: Number(status.health),
  };
}

// pulls pet status
export async function getPetStatusByPetId(petId) {
  const sql = `SELECT * FROM pet_status WHERE pet_id = $1`;
  const {
    rows: [status],
  } = await db.query(sql, [petId]);
  return parsePetStatus(status);
}

// updates every status
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
  return parsePetStatus(status);
}

export async function decayPetStatusIfNeeded(petId) {
  const sql = `SELECT * FROM pet_status WHERE pet_id = $1`;
  const { rows } = await db.query(sql, [petId]);
  if (!rows[0]) return null;

  const now = new Date();
  const current = rows[0];

  const decayRates = {
    hunger: 0.5,
    cleanliness: 0.2,
    happiness: 0.4,
    energy: 0.3,
  };

  // function minutesSince(timestamp) {
  //   if (!timestamp) return 0;
  //   const minutes = Math.floor((Date.now() - new Date(timestamp)) / 60000);
  //   return minutes;
  // }

  function minutesSince(timestamp) {
    if (!timestamp) return 0; // Treat as "just now" instead of unlimited decay
    return Math.floor((Date.now() - new Date(timestamp)) / 60000);
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

  //     const averageStat = (
  //   updated.hunger +
  //   updated.cleanliness +
  //   updated.happiness +
  //   updated.energy
  // ) / 4;
  // updated.health = Math.round(averageStat);

  // Base health as average of core stats
  let health =
    (updated.hunger +
      updated.cleanliness +
      updated.happiness +
      updated.energy) /
    4;

  //  Apply penalties for any stat that hit 0
  const penaltyPerZeroStat = 2;
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
      Math.ceil(updated.hunger),
      Math.ceil(updated.cleanliness),
      Math.ceil(updated.happiness),
      Math.ceil(updated.energy),
      Math.ceil(updated.health),
      updated.dead,
      petId,
    ]
  );

  return parsePetStatus({ ...current, ...updated });
}
