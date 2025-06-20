import db from "#db/client";

export async function getEquippedItemsByPetId(petId) {
  const sql = `
    SELECT ei.item_id, i.name, i.description, i.image_url, i.type, ei.equipped_at
    FROM equipped_items ei
    JOIN items i ON ei.item_id = i.id
    WHERE ei.pet_id = $1
  `;
  const { rows } = await db.query(sql, [petId]);
  return rows;
}

export async function equipItemToPet({ petId, itemId }) {
  const sql = `
    INSERT INTO equipped_items (pet_id, item_id)
    VALUES ($1, $2)
    ON CONFLICT (pet_id, item_id) DO NOTHING
  `;
  await db.query(sql, [petId, itemId]);
}

export async function unequipItemFromPet({ petId, itemId }) {
  const sql = `
    DELETE FROM equipped_items
    WHERE pet_id = $1 AND item_id = $2
  `;
  await db.query(sql, [petId, itemId]);
}

// Unequip all items from a pet (optional)
export async function unequipAllItemsFromPet(petId) {
  const sql = `
    DELETE FROM equipped_items
    WHERE pet_id = $1
  `;
  await db.query(sql, [petId]);
}
