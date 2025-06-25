import cron from "node-cron";
import { getAllPets } from "#db/queries/pets";
import { decayPetStatusIfNeeded } from "#db/queries/pet_status";


cron.schedule("* * * * * * ", async () => {

  try {
    const pets = await getAllPets();
    for (const pet of pets) {
      await decayPetStatusIfNeeded(pet.id);
    }
    console.log(`[${new Date().toISOString()}] Pet status decayed.`);
  } catch (err) {
    console.error("Decay cron error:", err);
  }
});
