import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import { getShopById, getShopInventory, buyItemForPet } from "#db/queries/shop";
import { getPetByUserId } from "#db/queries/pets";

router.use(requireUser);

// Param loader for :shopId c
router.param("shopId", async (req, res, next, shopId) => {
  const shop = await getShopById(shopId);
  if (!shop) return res.status(404).send("Shop not found.");
  req.shop = shop;
  next();
});

// GET /shops/:shopId/items — show inventory
router.get("/:shopId/items", async (req, res) => {
  const items = await getShopInventory(req.shop.id);
  res.send(items);
});

// POST /shops/:shopId/buy — buy item for current user’s pet
router.post("/:shopId/buy", requireBody(["item_id"]), async (req, res) => {
  const { item_id } = req.body;
  const userId = req.user.id;

  const pet = await getPetByUserId(userId);
  if (!pet) return res.status(404).send("You don't have a pet.");

  try {
    await buyItemForPet({
      shopId: req.shop.id,
      itemId: item_id,
      userId,
      petId: pet.id,
    });

    res.send({ message: "Purchase successful!" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
