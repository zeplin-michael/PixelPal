import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import validateItemFields from "#middleware/validateItemFields";

import {
  getAllItems,
  getItemById,
  createItem,
  updateItemById,
  deleteItemById,
} from "#db/queries/items";

router.use(requireUser);

// GET /items - list all available items
router.get("/", async (req, res) => {
  const items = await getAllItems();
  res.send(items);
});

// POST /items - create new item
router.post(
  "/",

  requireBody(["name", "description", "image_url", "price", "type"]),
  validateItemFields,

  async (req, res) => {
    const item = await createItem(req.body);
    res.status(201).send(item);
    try {
      const item = await createItem(req.body);
      res.status(201).send(item);
    } catch (err) {
      if (err.code === "23505") {
        return res.status(409).send("Item name already exists.");
      }
      res.status(500).send("Failed to create item.");
    }
  }
);

// Param loader
router.param("id", async (req, res, next, id) => {
  try {
    const item = await getItemById(id);
    if (!item) return res.status(404).send("Item not found.");
    req.item = item;
    next();
  } catch (err) {
    console.error("Failed to load item:", err);
    res.status(500).send("Server error while loading item.");
  }
});

// GET /items/:id - get single item
router.get("/:id", (req, res) => {
  res.send(req.item);
});

// PUT /items/:id - update item
router.put(
  "/:id",

  requireBody(["name", "description", "image_url", "price", "type"]),
  validateItemFields,
  async (req, res) => {
    try {
      const updated = await updateItemById({
        id: req.item.id,
        ...req.body,
      });
      res.send(updated);
    } catch (err) {
      if (err.code === "23505") {
        return res.status(409).send("Item name already exists.");
      }
      console.error("Error updating item:", err);
      res.status(500).send("Failed to update item.");
    }
  }
);

// DELETE /items/:id - delete item
router.delete("/:id", async (req, res) => {
  try {
    await deleteItemById(req.item.id);
    res.sendStatus(204);
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).send("Failed to delete item.");
  }
});
