import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createPetStatus } from "#db/queries/pet_status";
import { createPet } from "#db/queries/pets";
import { createShops } from "#db/queries/shops";
import { createItems } from "#db/queries/items";
import { createShopInventory } from "#db/queries/shop_inventory";
import { createPetItems } from "#db/queries/pet_items";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await db.query(`TRUNCATE pet_status, pets, users RESTART IDENTITY CASCADE`);
  const user = await createUser("user1", "password1");
  const pet = await createPet(user.id, "Grogu");
  const shop = await createShops("Accessories");
  await createPetStatus(pet.id, 50, 50, 50, 50, 50);
  const item = await createItems(
    "Retro Shades",
    "Perfect 50s styled aviators",
    "null",
    3
  );
  await createShopInventory(shop.id, item.id, 1, 3);
  await createPetItems(pet.id, item.id);
}
