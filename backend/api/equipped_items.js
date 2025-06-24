import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import {
  getEquippedItemsByPetId,
  equipItemToPet,
  unequipItemFromPet,
  unequipAllItemsFromPet,
} from "#db/queries/equipped_items";

import { getPetById } from "#db/queries/pets";

router.use(requireUser);

// Param loader for :petId
router.param("petId", async (req, res, next, petId) => {
  try {
    const pet = await getPetById(petId);
    if (!pet) return res.status(404).send("Pet not found.");
    if (pet.user_id !== req.user.id) return res.status(403).send("Forbidden.");
    req.pet = pet;
    next();
  } catch (err) {
    console.error("Error loading pet:", err);
    res.status(500).send("Failed to load pet.");
  }
});

// GET /equipped_items/:petId - get equipped items for a pet
router.get("/:petId", async (req, res) => {
  try {
    const equipped = await getEquippedItemsByPetId(req.pet.id);
    res.send(equipped);
  } catch (err) {
    console.error("Error fetching equipped items:", err);
    res.status(500).send("Failed to fetch equipped items.");
  }
});

// POST /equipped_items/:petId - equip an item
router.post("/:petId", requireBody(["item_id"]), async (req, res) => {
  try {
    const { item_id } = req.body;
    await equipItemToPet({ petId: req.pet.id, itemId: item_id });
    res.status(201).send({ message: "Item equipped." });
  } catch (err) {
    console.error("Error equipping item:", err);
    res.status(500).send("Failed to equip item.");
  }
});

// DELETE /equipped_items/:petId - unequip a specific item
router.delete("/:petId", requireBody(["item_id"]), async (req, res) => {
  try {
    const { item_id } = req.body;
    await unequipItemFromPet({ petId: req.pet.id, itemId: item_id });
    res.send({ message: "Item unequipped." });
  } catch (err) {
    console.error("Error unequipping item:", err);
    res.status(500).send("Failed to unequip item.");
  }
});

// DELETE /equipped_items/:petId/all - unequip all items
router.delete("/:petId/all", async (req, res) => {
  try {
    await unequipAllItemsFromPet(req.pet.id);
    res.send({ message: "All items unequipped." });
  } catch (err) {
    console.error("Error unequipping all items:", err);
    res.status(500).send("Failed to unequip all items.");
  }
});
