import db from "#db/client";

<<<<<<< HEAD
//question on [status]. Pulls the status of pet in single row but pulls everything? =================
export async function getPetStatusById(petId) {
  const sql = `SELECT * FROM pet_status WHERE pet_id = $1`;
  const {
    rows: [status],
  } = await db.query(sql, [petId]);
  return status;
}

//updates every status, should it do partial updates? Sending back singlke status updates ======================
export async function updatePetStatus({
=======
export async function createPetStatus(
  petId,
>>>>>>> 29f856726d95910490e0868710955df665c6cdd9
  hunger,
  cleanliness,
  happiness,
  energy,
<<<<<<< HEAD
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
=======
  health
) {
  const sql = `
        INSERT INTO pet_status
        (pet_id, hunger, cleanliness, happiness, energy, health)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `;
  const {
    rows: [pet],
  } = await db.query(sql, [
    petId,
>>>>>>> 29f856726d95910490e0868710955df665c6cdd9
    hunger,
    cleanliness,
    happiness,
    energy,
    health,
<<<<<<< HEAD
    petId,
  ]);
  return status;
}

// add a calculation to make decay affect health======================

export async function decayPetStatusIfNeeded(petId) {
  const sql = `SELECT * FROM pet_status WHERE pet_id = $1`;
  const { rows } = await db.query(sql, [petId]);
  if (!rows[0]) return null;

  //current timestamp & current status
  const now = new Date();
  const current = rows[0];

  //calculates minutes since last given timestamp
  function minutesSince(timestamp) {
    return timestamp ? Math.floor((now - new Date(timestamp)) / 60000) : 0;
  }

  //each stat decay calculation, down 1 every 10, 15, 20, 30 minutes (adjustable)
  const hungerLoss = Math.floor(minutesSince(current.last_fed_at) / 10);
  const cleanlinessLoss = Math.floor(
    minutesSince(current.last_cleaned_at) / 15
  );
  const happinessLoss = Math.floor(minutesSince(current.last_played_at) / 20);
  const energyLoss = Math.floor(minutesSince(current.last_slept_at) / 30);

  //subtracts decay loss from current status to get sum of new status
  const updated = {
    hunger: Math.max(current.hunger - hungerLoss, 0),
    cleanliness: Math.max(current.cleanliness - cleanlinessLoss, 0),
    happiness: Math.max(current.happiness - happinessLoss, 0),
    energy: Math.max(current.energy - energyLoss, 0),
    health: current.health, // optionally update this based on other conditions
  };

  //updates data with new pet status
  await db.query(
    `UPDATE pet_status
     SET hunger = $1,
         cleanliness = $2,
         happiness = $3,
         energy = $4
     WHERE pet_id = $5`,
    [
      updated.hunger,
      updated.cleanliness,
      updated.happiness,
      updated.energy,
      petId,
    ]
  );

  return { ...current, ...updated };
=======
  ]);
  return pet;
>>>>>>> 29f856726d95910490e0868710955df665c6cdd9
}
