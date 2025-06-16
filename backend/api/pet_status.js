import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import {
  getPetStatusById,
  updatePetStatus,
  decayPetStatusIfNeeded,
} from "#db/queries/pet_status";
import { getPetById } from "#db/queries/pets";

router.use(requireUser);

// Param loader for :id (petId)
router.param("id", async (req, res, next, id) => {
  const pet = await getPetById(id);
  if (!pet) return res.status(404).send("Pet not found.");
  if (pet.user_id !== req.user.id) return res.status(403).send("Forbidden.");
  req.pet = pet;
  next();
});

// GET /pet_status/:id – get current status with optional decay applied
router.get("/:id", async (req, res) => {
  const status = await decayPetStatusIfNeeded(req.pet.id);
  res.send(status);
});

// PUT /pet_status/:id – update specific fields manually (admin/dev use)
router.put(
  "/:id",
  requireBody(["hunger", "cleanliness", "happiness", "energy", "heatlh"]),
  async (req, res) => {
    const updated = await updatePetStatus(req.pet.id, req.body);
    res.send(updated);
  }
);
