import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

import {
  getInventoryByShopId,
  getShopInventoryItem,
  addItemToShop,
  updateShopInventoryItem,
  removeItemFromShop,
} from "#db/queries/shop_inventory";

import { getShopById } from "#db/queries/shops";

router.use(requireUser);

// Param loader for :shopId
router.param("shopId", async (req, res, next, shopId) => {
  const shop = await getShopById(shopId);
  if (!shop) return res.status(404).send("Shop not found.");
  req.shop = shop;
  next();
});

// Param loader for :itemId
router.param("itemId", async (req, res, next, itemId) => {
  const inventoryItem = await getShopInventoryItem(req.shop.id, itemId);
  if (!inventoryItem) return res.status(404).send("Item not found in shop.");
  req.inventoryItem = inventoryItem;
  next();
});

// GET /shop_inventory/:shopId - view shop inventory
router.get("/:shopId", async (req, res) => {
  const inventory = await getInventoryByShopId(req.shop.id);
  res.send(inventory);
});

// POST /shop_inventory/:shopId - add item to shop
router.post(
  "/:shopId",
  requireBody(["item_id", "quantity", "price"]),
  async (req, res) => {
    const { item_id, quantity, price } = req.body;

    const newEntry = await addItemToShop(req.shop.id, item_id, quantity, price);
    res.status(201).send(newEntry);
  }
);

// PUT /shop_inventory/:shopId/:itemId - update quantity/price
router.put(
  "/:shopId/:itemId",
  requireBody(["quantity", "price"]),
  async (req, res) => {
    const { quantity, price } = req.body;

    const updated = await updateShopInventoryItem(
      req.shop.id,
      req.inventoryItem.item_id,
      quantity,
      price
    );
    res.send(updated);
  }
);

// DELETE /shop_inventory/:shopId/:itemId - remove item from shop
router.delete("/:shopId/:itemId", async (req, res) => {
  await removeItemFromShop(req.shop.id, req.inventoryItem.item_id);
  res.sendStatus(204);
});
