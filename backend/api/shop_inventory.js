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
  try {
    const inventory = await getInventory();
    res.send(inventory);
  } catch (err) {
    console.error("Error fetching shop inventory:", err);
    res.status(500).send({ error: "Failed to retrieve shop inventory." });
  }
});

// GET /shop_inventory/:itemId - get single item
router.get("/:itemId", async (req, res) => {
  try {
    const item = await getShopInventoryItem(req.params.itemId);
    if (!item)
      return res.status(404).send({ error: "Item not found in shop." });
    res.send(item);
  } catch (err) {
    console.error(`Error getting shop item ${req.params.itemId}:`, err);
    res.status(500).send({ error: "Failed to retrieve shop item." });
  }
});

// POST /shop_inventory - add item
router.post(
  "/",
  requireBody(["item_id", "quantity", "price"]),
  async (req, res) => {
    try {
      const { item_id, quantity, price } = req.body;

      // Basic type checking
      if (![item_id, quantity, price].every(Number.isInteger)) {
        return res.status(400).send({ error: "All fields must be integers." });
      }

      const newEntry = await addItemToShop(item_id, quantity, price);
      res.status(201).send(newEntry);
    } catch (err) {
      console.error("Error adding item to shop:", err);
      res.status(500).send({ error: "Failed to add item to shop." });
    }
  }
);

// PUT /shop_inventory/:itemId - update item
router.put("/:itemId", requireBody(["quantity", "price"]), async (req, res) => {
  try {
    const { quantity, price } = req.body;
    const { itemId } = req.params;

    if (![quantity, price].every(Number.isInteger)) {
      return res
        .status(400)
        .send({ error: "Quantity and price must be integers." });
    }

    const updated = await updateShopInventoryItem(itemId, quantity, price);
    if (!updated) return res.status(404).send({ error: "Item not found." });
    res.send(updated);
  } catch (err) {
    console.error(`Error updating shop item ${req.params.itemId}:`, err);
    res.status(500).send({ error: "Failed to update item." });
  }
});

// DELETE /shop_inventory/:itemId - remove item
router.delete("/:itemId", async (req, res) => {
  try {
    const deleted = await removeItemFromShop(req.params.itemId);
    if (!deleted) return res.status(404).send({ error: "Item not found." });
    res.status(204).end();
  } catch (err) {
    console.error(`Error deleting shop item ${req.params.itemId}:`, err);
    res.status(500).send({ error: "Failed to delete item." });
  }
});
