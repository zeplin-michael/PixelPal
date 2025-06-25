import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createPet } from "#db/queries/pets";
import { createItem } from "#db/queries/items";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  try {
    console.log("🌱 Seeding...");

    // create bank
    const { rows: bankRows } = await db.query(`
      INSERT INTO bank (name, balance)
      VALUES ('Central Bank', 1000000)
      RETURNING id
    `);
    const bankId = bankRows[0].id;

    // seed users, pets, pet status, overall stats, coin transactions
    for (let i = 0; i < 5; i++) {
      const user = await createUser(`user${i}`, "password");
      const pet = await createPet(user.id, `pet${i}`);

      // starting coin transaction
      await db.query(
        `
        INSERT INTO coin_transactions (user_id, bank_id, amount, reason)
        VALUES ($1, $2, 10, 'starting balance')
      `,
        [user.id, bankId]
      );
    }

    // 3. seed items
    const items = [
      {
        name: "hat",
        description: "A cool hat",
        image_url: "hat",
        price: 4,
        type: "clothing",
      },
      {
        name: "tie",
        description: "A fancy tie",
        image_url: "tie",
        price: 3,
        type: "clothing",
      },
      {
        name: "apple",
        description: "Tasty apple",
        image_url: "apple",
        price: 2,
        type: "food",
      },
      {
        name: "banana",
        description: "Yummy banana",
        image_url: "banana",
        price: 1,
        type: "food",
      },
    ];

    for (const item of items) {
      await createItem(item);
    }

    // seed shop inventory
    const { rows: allItems } = await db.query(`SELECT id, price FROM items`);
    for (const item of allItems) {
      await db.query(
        `
        INSERT INTO shop_inventory (item_id, quantity, price)
        VALUES ($1, 10, $2)
      `,
        [item.id, item.price]
      );
    }

    // give pets starting food (pet_items)
    const { rows: pets } = await db.query(`SELECT id FROM pets`);
    const foodItems = allItems.filter((item) => item.price <= 2); // assuming food is cheap

    for (const pet of pets) {
      for (const food of foodItems) {
        await db.query(
          `
          INSERT INTO pet_items (pet_id, item_id, quantity)
          VALUES ($1, $2, 2)
        `,
          [pet.id, food.id]
        );
      }
    }

    // equip pets with one clothing item each (equipped_items)
    const clothingItems = allItems.filter((item) => item.price >= 3);
    for (let i = 0; i < pets.length; i++) {
      const petId = pets[i].id;
      const itemToEquip = clothingItems[i % clothingItems.length];
      await db.query(
        `
        INSERT INTO equipped_items (pet_id, item_id)
        VALUES ($1, $2)
      `,
        [petId, itemToEquip.id]
      );
    }
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  }
}
