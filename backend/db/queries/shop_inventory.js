import db from "#db/client";

//gets inventory for shop
export async function getInventoryByShopId(shopId) {
  const sql = `
    SELECT si.item_id, i.name, i.description, i.image_url, si.price, si.quantity
    FROM shop_inventory si
    JOIN items i ON i.id = si.item_id
    WHERE si.shop_id = $1
    ORDER BY si.item_id
  `;
  const {
    rows: [inventory],
  } = await db.query(sql, [shopId]);

  return inventory;
}

//gets item from shop inventory
export async function getShopInventoryItem(shopId, itemId) {
  const sql = `SELECT * FROM shop_inventory WHERE shop_id = $1 AND item_id = $2`;
  const {
    rows: [item],
  } = await db.query(sql, [shopId, itemId]);
  return item;
}

//not sure if we need this function but I'll leave it for now ====================
export async function addItemToShop(shopId, itemId, quantity, price) {
  const sql = `
    INSERT INTO shop_inventory (shop_id, item_id, quantity, price)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (shop_id, item_id)
    DO UPDATE SET quantity = shop_inventory.quantity + $3, price = $4
    RETURNING *
  `;
  const {
    rows: [item],
  } = await db.query(sql, [shopId, itemId, quantity, price]);

  return item;
}

//not sure if we need this ====================
export async function updateShopInventoryItem(shopId, itemId, quantity, price) {
  const sql = `
    UPDATE shop_inventory
    SET quantity = $1, price = $2
    WHERE shop_id = $3 AND item_id = $4
    RETURNING *
  `;
  const {
    rows: [item],
  } = await db.query(sql, [quantity, price, shopId, itemId]);

  return item;
}

//removes item from shop
export async function removeItemFromShop(shopId, itemId) {
  const sql = `DELETE FROM shop_inventory WHERE shop_id = $1 AND item_id = $2`;

  await db.query(sql, [shopId, itemId]);
}
//should i return deleted item in case or not?
