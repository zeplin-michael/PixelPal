import db from "#db/client";
// // dont need
// export async function getShopById(shopId) {
//   const sql = `SELECT * FROM shops WHERE id = $1`;
//   const {
//     rows: [shop],
//   } = await db.query(sql, [shopId]);
//   return shop;
// }

export async function getShopInventory(shopId) {
  const sql = `SELECT si.item_id, i.name, i.description, i.image_url, si.price, si.quantity
    FROM shop_inventory si
    JOIN items i ON i.id = si.item_id
    WHERE si.shop_id = $1
  `;
  const {
    rows: [shop],
  } = await db.query(sql, [shopId]);
  return shop;
}

//gets item from shop inventory
//function is good as is
export async function buyItemForPet({ shopId, itemId, userId, petId }) {
  const sql = `SELECT * FROM shop_inventory WHERE shop_id = $1 AND item_id = $2`;
  const {
    rows: [shopItem],
  } = await db.query(sql, [shopId, itemId]);

  //throws error if item is not available
  if (!shopItem || shopItem.quantity <= 0) {
    throw new Error("Item not available.");
  }

  //checks users coins
  const {
    rows: [user],
  } = await db.query(`SELECT coins FROM users WHERE id = $1`, [userId]);
  if (user.coins < shopItem.price) {
    throw new Error("Not enough coins.");
  }

  //starts transaction
  try {
    await db.query(`BEGIN`);
    //takes users coins
    await db.query(`UPDATE users SET coins = coins - $1 WHERE id = $2`, [
      shopItem.price,
      userId,
    ]);

    //updates item for pet
    await db.query(
      `
    INSERT INTO pet_items (pet_id, item_id, quantity)
    VALUES ($1, $2, 1)
    ON CONFLICT (pet_id, item_id)
    DO UPDATE SET quanitity = pet_items.quantity + 1
  `,
      [petId, itemId]
    );

    //removes item from shop
    await db.query(
      `
    UPDATE shop_inventory
    SET quantity = quantity - 1
    WHERE shop_id = $1 AND item_id = $2
  `,
      [shopId, itemId]
    );

    await db.query(`COMMIT`);
  } catch (err) {
    await db.query(`ROLLBACK`);
    throw err;
  }
}
