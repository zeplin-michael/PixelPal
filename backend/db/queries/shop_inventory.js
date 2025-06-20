import db from "#db/client";

// gets inventory for shop
export async function getInventory() {
  const sql = `
    SELECT si.item_id, i.name, i.description, i.image_url, si.price, si.quantity
    FROM shop_inventory si
    JOIN items i ON i.id = si.item_id
    ORDER BY si.item_id
  `;
  const { rows } = await db.query(sql);
  return rows;
}

// gets item from shop inventory
export async function getShopInventoryItem(itemId) {
  const sql = `SELECT * FROM shop_inventory WHERE item_id = $1`;
  const {
    rows: [item],
  } = await db.query(sql, [itemId]);
  return item;
}

// not sure if we need this function but I'll leave it for now ====================
export async function addItemToShop(itemId, quantity, price) {
  const sql = `
    INSERT INTO shop_inventory (item_id, quantity, price)
    VALUES ($1, $2, $3)
    ON CONFLICT (item_id)
    DO UPDATE SET quantity = shop_inventory.quantity + $2, price = $3
    RETURNING *
  `;
  const {
    rows: [item],
  } = await db.query(sql, [itemId, quantity, price]);
  return item;
}

// not sure if we need this ====================
export async function updateShopInventoryItem(itemId, quantity, price) {
  const sql = `
    UPDATE shop_inventory
    SET quantity = $1, price = $2
    WHERE item_id = $3
    RETURNING *
  `;
  const {
    rows: [item],
  } = await db.query(sql, [quantity, price, itemId]);
  return item;
}

// removes item from shop
export async function removeItemFromShop(itemId) {
  const sql = `
    DELETE FROM shop_inventory
    WHERE item_id = $1
    RETURNING *
  `;
  const {
    rows: [deleted],
  } = await db.query(sql, [itemId]);
  return deleted;
}
