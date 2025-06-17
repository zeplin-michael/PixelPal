import db from "#db/client";

export async function createShopInventory(shopId, itemId, quantity, price) {
  const sql = `
        INSERT INTO shop_inventory
        (shop_id, item_id, quantity, price)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *
    `;
  const {
    rows: [inventory],
  } = await db.query(sql, [shopId, itemId, quantity, price]);
  return inventory;
}
