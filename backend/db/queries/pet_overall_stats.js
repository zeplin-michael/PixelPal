import db from "#db/client";

// create initial stats record for a new pet
export async function createPetOverallStats(petId) {
  const sql = `
    INSERT INTO pet_overall_stats (pet_id)
    VALUES ($1)
    ON CONFLICT (pet_id) DO NOTHING;
  `;
  await db.query(sql, [petId]);
}

// get overall stats for a specific pet
export async function getPetOverallStats(petId) {
  const sql = `
    SELECT * FROM pet_overall_stats
    WHERE pet_id = $1;
  `;
  const { rows } = await db.query(sql, [petId]);
  return rows[0];
}

// update overall stats
export async function incrementPetStat(petId, statColumn, incrementBy = 1) {
  const sql = `
    UPDATE pet_overall_stats
    SET ${statColumn} = ${statColumn} + $1
    WHERE pet_id = $2
    RETURNING *;
  `;
  const { rows } = await db.query(sql, [incrementBy, petId]);
  return rows[0];
}

// delete pet overall stats
export async function deletePetOverallStats(petId) {
  const sql = `
    DELETE FROM pet_overall_stats
    WHERE pet_id = $1;
  `;
  await db.query(sql, [petId]);
}
