import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import { getInventory } from "#db/queries/shop_inventory";
import { buyItemForPet } from "#db/queries/bank";
import { getPetByUserId } from "#db/queries/pets";

router.use(requireUser);

// GET /shops/:shopId/items — show inventory
router.get("/inventory", async (req, res) => {
  try {
    const items = await getInventory();
    res.send(items);
  } catch (err) {
    console.error("Error fetching shop inventory:", err);
    res.status(500).send("Failed to fetch shop inventory.");
  }
});

// POST /shops/:shopId/buy — buy item for current user’s pet
router.post("/buy", requireBody(["item_id"]), async (req, res) => {
  const { item_id } = req.body;
  const userId = req.user.id;

  try {
    const pet = await getPetByUserId(userId);
    if (!pet) return res.status(404).send("You don't have a pet.");

    await buyItemForPet({
      itemId: item_id,
      userId,
      petId: pet.id,
    });

    res.send({ message: "Purchase successful!" });
  } catch (err) {
    console.error("Error during purchase:", err);
    // Send custom error message or fallback
    res.status(400).send(err.message || "Failed to process purchase.");
  }
});
