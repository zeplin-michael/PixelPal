import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import {
  getInventory,
  getShopInventoryItem,
  addItemToShop,
  updateShopInventoryItem,
  removeItemFromShop,
} from "#db/queries/shop_inventory";

router.use(requireUser);

// GET /shop_inventory - view all inventory
router.get("/", async (req, res) => {
  const inventory = await getInventory();
  res.send(inventory);
});

// GET /shop_inventory/:itemId - get single item
router.get("/:itemId", async (req, res) => {
  const item = await getShopInventoryItem(req.params.itemId);
  if (!item) return res.status(404).send("Item not found in shop.");
  res.send(item);
});

// POST /shop_inventory - add item
router.post(
  "/",
  requireBody(["item_id", "quantity", "price"]),
  async (req, res) => {
    const { item_id, quantity, price } = req.body;
    const newEntry = await addItemToShop(item_id, quantity, price);
    res.status(201).send(newEntry);
  }
);

// PUT /shop_inventory/:itemId - update item
router.put("/:itemId", requireBody(["quantity", "price"]), async (req, res) => {
  const { quantity, price } = req.body;
  const updated = await updateShopInventoryItem(
    req.params.itemId,
    quantity,
    price
  );
  if (!updated) return res.status(404).send("Item not found.");
  res.send(updated);
});

// DELETE /shop_inventory/:itemId - remove item
router.delete("/:itemId", async (req, res) => {
  const deleted = await removeItemFromShop(req.params.itemId);
  if (!deleted) return res.status(404).send("Item not found.");
  res.status(204).end();
});
