import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import {
  updatePetStatus,
  decayPetStatusIfNeeded,
} from "#db/queries/pet_status";
import { getPetById } from "#db/queries/pets";

router.use(requireUser);

// Param loader for :id (petId)
router.param("id", async (req, res, next, id) => {
  try {
    const pet = await getPetById(id);
    if (!pet) return res.status(404).send({ error: "Pet not found." });
    if (pet.user_id !== req.user.id)
      return res.status(403).send({ error: "Forbidden." });

    req.pet = pet;
    next();
  } catch (err) {
    console.error("Error loading pet:", err);
    res.status(500).send({ error: "Failed to load pet." });
  }
});

// GET /pet_status/:id – get current status with decay and health penalties
router.get("/:id", async (req, res) => {
  try {
    const status = await decayPetStatusIfNeeded(req.pet.id);
    if (!status) {
      return res.status(404).send({ error: "Pet status not found." });
    }
    res.send(status);
  } catch (err) {
    console.error("Error getting pet status:", err);
    res.status(500).send({ error: "Failed to get pet status." });
  }
});

// PUT /pet_status/:id – admin/dev manual update of pet status
router.put("/:id", async (req, res) => {
  try {
    const { hunger, cleanliness, happiness, energy, health, dead } = req.body;

    const updated = await updatePetStatus({
      hunger,
      cleanliness,
      happiness,
      energy,
      health,
      dead,
      petId: req.pet.id,
    });

    res.send(updated);
  } catch (err) {
    console.error("Error updating pet status:", err);
    res.status(500).send({ error: "Failed to update pet status." });
  }
});
