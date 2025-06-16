import db from "#db/client";

export async function createPetItems(petId, itemId) {
  const sql = `
        INSERT INTO pet_items
        (pet_id, item_id)
        VALUES
        ($1, $2)
        RETURNING *
    `;
  const {
    rows: [petItem],
  } = await db.query(sql, [petId, itemId]);
  return petItem;
}
