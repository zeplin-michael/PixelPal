import db from "#db/client";

//adds new item to table
export async function createItem({
  name,
  description,
  image_url,
  price,
  type,
}) {
  const sql = `INSERT INTO items (name, description, image_url, price, type)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`;
  const {
    rows: [item],
  } = await db.query(sql, [name, description, image_url, price, type]);
  return item;
}

//returns all items
export async function getAllItems() {
  const sql = `SELECT * FROM items ORDER BY id`;
  const { rows: items } = await db.query(sql);
  return items;
}

//gets single item by id
export async function getItemById(id) {
  const sql = `SELECT * FROM items WHERE id = $1`;
  const {
    rows: [item],
  } = await db.query(sql, [id]);
  return item;
}

//updates item by id
export async function updateItemById(name, description, image_url, price, id) {
  const sql = `UPDATE items
     SET name = $1, description = $2, image_url = $3, price = $4
     WHERE id = $5
     RETURNING *`;
  const {
    rows: [item],
  } = await db.query(sql, [name, description, image_url, price, id]);
  return item;
}

//deletes item by id
export async function deleteItemById(id) {
  const sql = `DELETE FROM items WHERE id = $1 RETURNING *`;
  const {
    rows: [item],
  } = await db.query(sql, [id]);
  return item;
}
