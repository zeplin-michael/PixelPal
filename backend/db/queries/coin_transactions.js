import db from "#db/client";

// Create a coin transaction between a user and a bank
export async function createTransaction({ userId, bankId, amount }) {
  const sql = `
    INSERT INTO coin_transactions (user_id, bank_id, amount)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [userId, bankId, amount];
  const { rows } = await db.query(sql, values);
  return rows[0];
}

// Get all coin transactions for a user
export async function getTransactionsByUserId(userId) {
  const sql = `
    SELECT ct.*, b.name AS bank_name
    FROM coin_transactions ct
    JOIN bank b ON ct.bank_id = b.id
    WHERE ct.user_id = $1
    ORDER BY ct.id DESC;
  `;
  const { rows } = await db.query(sql, [userId]);
  return rows;
}
