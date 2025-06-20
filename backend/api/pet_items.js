import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import {
  getPetItems,
  addItemToPet,
  removeItemFromPet,
  usePetItem,
} from "#db/queries/pet_items";
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

// GET /pet_items/:petId — list pet's inventory
router.get("/:petId", async (req, res) => {
  const items = await getPetItems(req.pet.id);
  res.send(items);
});

// POST /pet_items/:petId — give item to pet (admin/dev)
router.post(
  "/:petId",
  requireBody(["item_id", "quantity"]),
  async (req, res) => {
    const { item_id, quantity } = req.body;
    const updated = await addItemToPet(req.pet.id, item_id, quantity);
    res.status(201).send(updated);
  }
);

// PUT /pet_items/:petId/use — use item (affects pet status)
router.put("/:petId/use", requireBody(["item_id"]), async (req, res) => {
  const { item_id } = req.body;
  const result = await usePetItem(req.pet.id, item_id);
  res.send(result);
});

// DELETE /pet_items/:petId — remove item from inventory
router.delete("/:petId", requireBody(["item_id"]), async (req, res) => {
  const { item_id } = req.body;
  await removeItemFromPet(req.pet.id, item_id);
  res.sendStatus(204);
});
