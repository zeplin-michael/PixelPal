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
  const pet = await getPetById(petId);
  if (!pet) return res.status(404).send("Pet not found.");
  if (pet.user_id !== req.user.id) return res.status(403).send("Forbidden.");
  req.pet = pet;
  next();
});

// GET /equipped_items/:petId - get equipped items for a pet
router.get("/:petId", async (req, res) => {
  const equipped = await getEquippedItemsByPetId(req.pet.id);
  res.send(equipped);
});

// POST /equipped_items/:petId - equip an item
router.post("/:petId", requireBody(["item_id"]), async (req, res) => {
  const { item_id } = req.body;
  await equipItemToPet({ petId: req.pet.id, itemId: item_id });
  res.status(201).send({ message: "Item equipped." });
});

// DELETE /equipped_items/:petId - unequip a specific item
router.delete("/:petId", requireBody(["item_id"]), async (req, res) => {
  const { item_id } = req.body;
  await unequipItemFromPet({ petId: req.pet.id, itemId: item_id });
  res.send({ message: "Item unequipped." });
});

// DELETE /equipped_items/:petId/all - unequip all items
router.delete("/:petId/all", async (req, res) => {
  await unequipAllItemsFromPet(req.pet.id);
  res.send({ message: "All items unequipped." });
});
