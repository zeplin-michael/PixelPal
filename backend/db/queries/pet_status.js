import db from "#db/client";

export async function createPetStatus(
  petId,
  hunger,
  cleanliness,
  happiness,
  energy,
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
    hunger,
    cleanliness,
    happiness,
    energy,
    health,
  ]);
  return pet;
}
