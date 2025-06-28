import db from "#db/client";
import { getPetStatusByPetId } from "#db/queries/pet_status";
import { createPetOverallStats } from "#db/queries/pet_overall_stats";

// creates new pet
export async function createPet(userId, name, avatarUrl) {
  const createPetSql = `
    INSERT INTO pets (user_id, name, birthday, avatar_url)
    VALUES ($1, $2, CURRENT_DATE, $3)
    RETURNING *
  `;
  const {
    rows: [pet],
  } = await db.query(createPetSql, [userId, name, avatarUrl]);

  const createStatusSql = `
    INSERT INTO pet_status (pet_id, hunger, cleanliness, happiness, energy, health, last_fed_at, last_cleaned_at, last_played_at, last_slept_at)
    VALUES ($1, 100, 100, 100, 100, 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;
  await db.query(createStatusSql, [pet.id]);

  await createPetOverallStats(pet.id);

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
export async function getPetsByUserId(userId) {
  const sql = `
    SELECT pets.*, pet_status.*
    FROM pets
    JOIN pet_status ON pets.id = pet_status.pet_id
    WHERE user_id = $1
    ORDER BY pets.birthday ASC, pets.id ASC
  `;
  const { rows: pets } = await db.query(sql, [userId]);
  return pets;
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

// Get all pets, built for cron function
export async function getAllPets() {
  const sql = `
    SELECT id
    FROM pets
    WHERE is_alive = TRUE
  `;
  const { rows } = await db.query(sql);
  return rows;
}

// increases hunger by 10 every feed, caps at 50
export async function feedPet(petId) {
  const status = await getPetStatusByPetId(petId);

  const averageStat =
    (status.hunger + status.cleanliness + status.happiness + status.energy) / 4;

  const sql = `
    UPDATE pet_status
    SET hunger = LEAST(hunger + 6, 100), last_fed_at = NOW()
    WHERE pet_id = $1
  `;
  await db.query(sql, [petId]);
}

// ncreases cleanliness by 10 every clean, caps at 50
export async function cleanPet(petId) {
  const sql = `
    UPDATE pet_status
    SET cleanliness = LEAST(cleanliness + 10, 100), last_cleaned_at = NOW()
    WHERE pet_id = $1
  `;
  await db.query(sql, [petId]);
}

// increases happiness by 10 every play, caps at 50
export async function playWithPet(petId) {
  const sql = `
    UPDATE pet_status
    SET happiness = LEAST(happiness + 5, 100), last_played_at = NOW()
    WHERE pet_id = $1
  `;
  await db.query(sql, [petId]);
}

// increases energy by 10 every rest, caps at 50
export async function restPet(petId) {
  const sql = `
    UPDATE pet_status
    SET energy = LEAST(energy + 50, 100), last_slept_at = NOW()
    WHERE pet_id = $1
  `;
  await db.query(sql, [petId]);
}

export async function deletePet(petId) {
  const sql = `
    DELETE FROM pets
    WHERE id = $1
  `;
  await db.query(sql, [petId]);
}

// DONE
