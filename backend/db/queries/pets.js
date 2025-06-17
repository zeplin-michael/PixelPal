import db from "#db/client";

export async function createPet(userId, name) {
  const sql = `
        INSERT INTO pets
        (user_id, name)
        VALUES
        ($1, $2)
        RETURNING *
    `;
  const {
    rows: [pet],
  } = await db.query(sql, [userId, name]);
  return pet;
}
