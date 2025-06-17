import db from "#db/client";

export async function createItems(name, description, imageUrl, price) {
  const sql = `
        INSERT INTO items
        (name, description, image_url, price)
        VALUES
        ($1, $2, $3, $4)
        RETURNING *
    `;
  const {
    rows: [item],
  } = await db.query(sql, [name, description, imageUrl, price]);
  return item;
}
