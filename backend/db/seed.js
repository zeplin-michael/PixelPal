import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createPet } from "#db/queries/pets";
import { createItem } from "#db/queries/items";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const items = [
    {
      name: "hat",
      description: "hat",
      image_url: "hat",
      price: 4,
      type: "clothing",
    },
    {
      name: "tie",
      description: "tie",
      image_url: "tie",
      type: "clothing",
      price: 3,
    },
    {
      name: "apple",
      description: "apple",
      image_url: "apple",
      type: "food",
      price: 2,
    },
    {
      name: "banana",
      description: "banana",
      image_url: "banana",
      type: "food",
      price: 1,
    },
  ];

  console.log("🌱 Seeding database...");
  for (let i = 0; i < 10; i++) {
    const newUser = await createUser(`user${i}`, "password");
    const newPet = await createPet(newUser.id, `pet${i}`);
  }

  for (let i = 0; i < items.length; i++) {
    await createItem(items[i]);
  }
}
