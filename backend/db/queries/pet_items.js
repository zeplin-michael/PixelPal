import db from "#db/client";

//gets all items owned by specific pet
export async function getPetItems(petId) {
  const sql = `
    SELECT pi.item_id, i.name, i.description, i.image_url, pi.quantity
    FROM pet_items pi
    JOIN items i ON i.id = pi.item_id
    WHERE pi.pet_id = $1
    ORDER BY i.name
  `;
  const { rows: items } = await db.query(sql, [petId]);

  return items;
}

export async function addItemToPet(petId, itemId, quantity) {
  const sql = `
    INSERT INTO pet_items (pet_id, item_id, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (pet_id, item_id)
    DO UPDATE SET quanitity = pet_items.quantity + $3
    RETURNING *
  `;
  const {
    rows: [item],
  } = await db.query(sql, [petId, itemId, quantity]);

  return item;
}
// this function only allows a pet to have one of each item, the above function allows a pet items to stack ==================

// export async function addItemToPet(petId, itemId) {
//   const sql = `
//     INSERT INTO pet_items (pet_id, item_id, quantity)
//     VALUES ($1, $2, 1)
//     ON CONFLICT (pet_id, item_id)
//     DO NOTHING
//     RETURNING *
//   `;
//   const { rows: [item] } = await db.query(sql, [petId, itemId]);
//   return item;
// }

export async function removeItemFromPet(petId, itemId) {
  const sql = `
    DELETE FROM pet_items
    WHERE pet_id = $1 AND item_id = $2
  `;
  await db.query(sql, [petId, itemId]);
}

// function for using an item to change pet status, i.e happiness in this scenerio =================
export async function usePetItem(petId, itemId) {
  const sql = `
    SELECT quantity FROM pet_items
    WHERE pet_id = $1 AND item_id = $2
    `;
  const {
    rows: [item],
  } = await db.query(sql, [petId, itemId]);

  if (!item || item.quantity <= 0) {
    throw new Error("Item not available in inventory.");
  }

  try {
    await db.query(`BEGIN`);

    await db.query(
      `
      UPDATE pet_items
      SET quantity = quantity - 1
      WHERE pet_id = $1 AND item_id = $2
      `,
      [petId, itemId]
    );

    await db.query(
      `
      UPDATE pet_status
      SET happiness = LEAST(happiness + 10, 50)
      WHERE pet_id = $1
      `,
      [petId]
    );

    await db.query(`COMMIT`);
    return { message: "Item used!" };
  } catch (err) {
    await db.query(`ROLLBACK`);
    throw err;
  }
}
