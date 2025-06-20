import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import {
  getPetOverallStats,
  incrementPetStat,
} from "#db/queries/pet_overall_stats";
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

// GET /pet_overall_stats/:id – get pet's lifetime stats
router.get("/:id", async (req, res) => {
  const stats = await getPetOverallStats(req.pet.id);
  res.send(stats);
});

// POST /pet_overall_stats/:id/increment – increment a specific stat
router.post("/:id/increment", requireBody(["statColumn"]), async (req, res) => {
  const allowedStats = [
    "total_meals",
    "total_baths",
    "total_play_sessions",
    "total_sleep_sessions",
    "days_alive",
  ];

  const { statColumn } = req.body;

  if (!allowedStats.includes(statColumn)) {
    return res.status(400).send("Invalid stat column.");
  }

  const updated = await incrementPetStat(req.pet.id, statColumn);
  res.send(updated);
});
