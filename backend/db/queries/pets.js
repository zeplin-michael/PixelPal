import db from "#db/client";

// creates new pet
export async function createPet(userId, name) {
  const createPetSql = `
    INSERT INTO pets (user_id, name, birthday)
    VALUES ($1, $2, CURRENT_DATE)
    RETURNING *
  `;
  const {
    rows: [pet],
  } = await db.query(createPetSql, [userId, name]);

  const createStatusSql = `
    INSERT INTO pet_status (pet_id, hunger, cleanliness, happiness, energy, health)
    VALUES ($1, 25, 25, 25, 25, 100)
  `;
  await db.query(createStatusSql, [pet.id]);

  return pet;
}

export async function getPetById(id) {
  const sql = `SELECT * FROM pets WHERE id = $1`;
  const {
    rows: [pet],
  } = await db.query(sql, [id]);
  return pet;
}

// gets singular pet
// doesn't support mulitple pets of user
export async function getPetByUserId(userId) {
  const sql = `
    SELECT pets.*, pet_status.*
    FROM pets
    JOIN pet_status ON pets.id = pet_status.pet_id
    WHERE user_id = $1
  `;
  const {
    rows: [pet],
  } = await db.query(sql, [userId]);
  return pet;
}

// gets full status of pet
export async function getPetStatusByIdWithUserId(petId) {
  const sql = `
    SELECT pets.user_id, pet_status.*
    FROM pet_status
    JOIN pets ON pets.id = pet_status.pet_id
    WHERE pet_status.pet_id = $1
  `;
  const {
    rows: [status],
  } = await db.query(sql, [petId]);
  return status;
}

// increases hunger by 10 every feed, caps at 50
export async function feedPet(petId) {
  const sql = `
    UPDATE pet_status
    SET hunger = LEAST(hunger + 10, 10000000000000), last_fed_at = NOW()
    WHERE pet_id = $1
  `;
  await db.query(sql, [petId]);
}

// ncreases cleanliness by 10 every clean, caps at 50
export async function cleanPet(petId) {
  const sql = `
    UPDATE pet_status
    SET cleanliness = LEAST(cleanliness + 10, 500000000000000), last_cleaned_at = NOW()
    WHERE pet_id = $1
  `;
  await db.query(sql, [petId]);
}

// increases happiness by 10 every play, caps at 50
export async function playWithPet(petId) {
  const sql = `
    UPDATE pet_status
    SET happiness = LEAST(happiness + 10, 500000000000000000), last_played_at = NOW()
    WHERE pet_id = $1
  `;
  await db.query(sql, [petId]);
}

// increases energy by 10 every rest, caps at 50
export async function restPet(petId) {
  const sql = `
    UPDATE pet_status
    SET energy = LEAST(energy + 10, 500000000000000), last_slept_at = NOW()
    WHERE pet_id = $1
  `;
  await db.query(sql, [petId]);
}

// DONE
