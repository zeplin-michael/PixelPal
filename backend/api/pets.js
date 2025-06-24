import express from "express";
const router = express.Router();
export default router;

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

import {
  createPet,
  getPetByUserId,
  feedPet,
  cleanPet,
  playWithPet,
  restPet,
  deletePet,
} from "#db/queries/pets";

import { getPetStatusByPetId } from "#db/queries/pet_status";

router.use(requireUser);

// GET /pets - get current user's pet
router.get("/", async (req, res) => {
  const pet = await getPetByUserId(req.user.id);
  if (!pet) return res.status(404).send("Pet not found.");
  res.send(pet);
});

// POST /pets - create new pet and return pet with it's current status
router.post("/", requireBody(["name"]), async (req, res) => {
  const { name } = req.body;
  const pet = await createPet(req.user.id, name);
  const petStatus = await getPetStatusByPetId(pet.id);
  pet.status = petStatus;
  res.status(201).json(pet);
});

// Route param middleware: load pet status
router.param("id", async (req, res, next, id) => {
  const pet = await getPetByUserId(id);
  if (!pet) return res.status(404).send("Pet not found.");
  if (pet.dead) {
    return res.status(400).send({ message: "Cannot interact with dead pet." });
  }
  if (pet.user_id !== req.user.id) return res.status(403).send("Forbidden.");
  req.pet = pet;
  next();
});

// PUT /pets/:id/feed
router.put("/:id/feed", async (req, res) => {
  try {
    if (!req.pet.id) {
      return res.status(400).send({ message: "No pet found." });
    }
    await feedPet(req.pet.id);
    const petStatus = await getPetStatusByPetId(req.pet.id);
    res.json({ message: "Pet fed.", petStatus });
  } catch (err) {
    console.log(err);
  }
});

// PUT /pets/:id/clean
router.put("/:id/clean", async (req, res) => {
  try {
    if (!req.pet.id) {
      return res.status(400).send({ message: "No pet found." });
    }
    await cleanPet(req.pet.id);
    const petStatus = await getPetStatusByPetId(req.pet.id);
    res.json({ message: "Pet cleaned.", petStatus });
  } catch (err) {
    console.log(err);
  }
});

// PUT /pets/:id/play
router.put("/:id/play", async (req, res) => {
  try {
    if (!req.pet.id) {
      return res.status(400).send({ message: "No pet found." });
    }
    await playWithPet(req.pet.id);
    const petStatus = await getPetStatusByPetId(req.pet.id);
    res.json({ message: "Pet played with.", petStatus });
  } catch (err) {
    console.log(err);
  }
});

// PUT /pets/:id/sleep
router.put("/:id/sleep", async (req, res) => {
  try {
    if (!req.pet.id) {
      return res.status(400).send({ message: "No pet found." });
    }
    await restPet(req.pet.id);
    const petStatus = await getPetStatusByPetId(req.pet.id);
    res.json({ message: "Pet rested.", petStatus });
  } catch (err) {
    console.log(err);
  }
});

// DELETE /pets/:id
router.delete("/:id", async (req, res) => {
  await deletePet(req.pet.id);
  res.send({ message: "Pet deleted." });
});
