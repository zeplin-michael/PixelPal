import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import { getTransactionsByUserId } from "#db/queries/coin_transactions";

router.use(requireUser);

// GET /coin_transactions - list all transactions for the current user
router.get("/", async (req, res) => {
  try {
    const transactions = await getTransactionsByUserId(req.user.id);
    res.send(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).send("Failed to retrieve coin transactions.");
  }
});
