import express from "express";
const router = express.Router();
export default router;

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

import {
  createPet,
  getPetByUserId,
  getPetStatusById,
  feedPet,
  cleanPet,
  playWithPet,
  restPet,
} from "#db/queries/pets";

router.use(requireUser);

// GET /pets - get current user's pet
router.get("/", async (req, res) => {
  const pet = await getPetByUserId(req.user.id);
  if (!pet) return res.status(404).send("Pet not found.");
  res.send(pet);
});

// POST /pets - create new pet
router.post("/", requireBody(["name"]), async (req, res) => {
  const { name } = req.body;
  const pet = await createPet(req.user.id, name);
  res.status(201).send(pet);
});

// Route param middleware: load pet status
router.param("id", async (req, res, next, id) => {
  const pet = await getPetStatusById(id);
  if (!pet) return res.status(404).send("Pet not found.");
  if (pet.user_id !== req.user.id) return res.status(403).send("Forbidden.");
  req.pet = pet;
  next();
});

// PUT /pets/:id/feed
router.put("/:id/feed", async (req, res) => {
  await feedPet(req.pet.id);
  res.send({ message: "Pet fed." });
});

// PUT /pets/:id/clean
router.put("/:id/clean", async (req, res) => {
  await cleanPet(req.pet.id);
  res.send({ message: "Pet cleaned." });
});

// PUT /pets/:id/play
router.put("/:id/play", async (req, res) => {
  await playWithPet(req.pet.id);
  res.send({ message: "Played with pet." });
});

// PUT /pets/:id/sleep
router.put("/:id/sleep", async (req, res) => {
  await restPet(req.pet.id);
  res.send({ message: "Pet rested." });
});


// DELETE /pets/:id
router.delete("/:id", async (req, res) => {
  await deletePet(req.pet.id);
  res.send({ message: "Pet deleted." });
});

