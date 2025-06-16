import db from "#db/client";

export async function createShops(name) {
  const sql = `
        INSERT INTO shops
        (name)
        VALUES
        ($1)
        RETURNING *
    `;
  const {
    rows: [shop],
  } = await db.query(sql, [name]);
  return shop;
}
