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
    DO UPDATE SET quantity = pet_items.quantity + $3
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
  const {
    rows: [removed],
  } = await db.query(sql, [petId, itemId]);
  return removed;
}

// might want to put a usage max per item so you can't use the same item too many times (i.e food)
export async function usePetItem(petId, itemId) {
  // Get the item effect
  const {
    rows: [item],
  } = await db.query(
    `
    SELECT pi.quantity, i.effect_target, i.effect_value
    FROM pet_items pi
    JOIN items i ON i.id = pi.item_id
    WHERE pi.pet_id = $1 AND pi.item_id = $2
    `,
    [petId, itemId]
  );

  if (!item || item.quantity <= 0) {
    throw new Error("Item not available in inventory.");
  }

  // Safety: only allow valid target stat fields
  const validTargets = [
    "hunger",
    "cleanliness",
    "happiness",
    "energy",
    "health",
  ];
  if (!validTargets.includes(item.effect_target)) {
    throw new Error("Invalid item effect target.");
  }

  try {
    await db.query(`BEGIN`);

    // Reduce item quantity
    await db.query(
      `UPDATE pet_items
       SET quantity = quantity - 1
       WHERE pet_id = $1 AND item_id = $2`,
      [petId, itemId]
    );

    // Dynamically update the correct stat, capped at 50
    const updateSql = `
      UPDATE pet_status
      SET ${item.effect_target} = LEAST(${item.effect_target} + $1, 50)
      WHERE pet_id = $2
    `;
    await db.query(updateSql, [item.effect_value, petId]);

    await db.query(`COMMIT`);
    return {
      message: `Increased ${item.effect_target} by ${item.effect_value}!`,
    };
  } catch (err) {
    await db.query(`ROLLBACK`);
    throw err;
  }
}
