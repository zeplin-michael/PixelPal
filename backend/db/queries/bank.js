import db from "#db/client";

export async function getShopInventory() {
  const sql = `SELECT si.item_id, i.name, i.description, i.image_url, si.price, si.quantity
    FROM shop_inventory si
    JOIN items i ON i.id = si.item_id
    WHERE si.shop_id = $1
  `;
  const {
    rows: [shop],
  } = await db.query(sql);
  return shop;
}

// gets item from shop inventory
// changed function to differentiate food and clothing in the shop===================
export async function buyItemForPet({ itemId, userId, petId }) {
  // Fetch item details including price and type
  const {
    rows: [item],
  } = await db.query(`SELECT price, type FROM items WHERE id = $1`, [itemId]);

  if (!item) {
    throw new Error("Item not found.");
  }

  // checks users coin balance
  const {
    rows: [user],
  } = await db.query(`SELECT coins_balance FROM users WHERE id = $1`, [userId]);

  if (!user || user.coins_balance < item.price) {
    throw new Error("Not enough coins.");
  }

  try {
    await db.query(`BEGIN`);

    // deduct coins from user
    await db.query(
      `UPDATE users SET coins_balance = coins_balance - $1 WHERE id = $2`,
      [item.price, userId]
    );

    // Log transaction
    await db.query(
      `
      INSERT INTO coin_transactions (user_id, bank_id, amount, reason)
      VALUES ($1, 1, $2, $3)
    `,
      [userId, -item.price, `Bought ${item.type}`]
    );

    // food - add to inventory
    if (item.type === "food") {
      await db.query(
        `
        INSERT INTO pet_items (pet_id, item_id, quantity)
        VALUES ($1, $2, 1)
        ON CONFLICT (pet_id, item_id)
        DO UPDATE SET quantity = pet_items.quantity + 1
      `,
        [petId, itemId]
      );
    }

    // clothing - add to inventory and auto-equip if available
    else if (item.type === "clothing") {
      await db.query(
        `
        INSERT INTO pet_items (pet_id, item_id, quantity)
        VALUES ($1, $2, 1)
        ON CONFLICT (pet_id, item_id)
        DO UPDATE SET quantity = pet_items.quantity + 1
      `,
        [petId, itemId]
      );

      // auto-equip clothing item if available
      await db.query(
        `
        INSERT INTO equipped_items (pet_id, item_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
      `,
        [petId, itemId]
      );
    }

    await db.query(`COMMIT`);
  } catch (err) {
    await db.query(`ROLLBACK`);
    throw err;
  }
}
