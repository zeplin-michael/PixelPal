import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

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

// POST /items - create new item (admin/dev)
router.post(
  "/",

  requireBody(["name", "description", "image_url", "price", "type"]),

  async (req, res) => {
    const item = await createItem(req.body);
    res.status(201).send(item);
  }
);

// Param loader
router.param("id", async (req, res, next, id) => {
  const item = await getItemById(id);
  if (!item) return res.status(404).send("Item not found.");
  req.item = item;
  next();
});

// GET /items/:id - get single item
router.get("/:id", (req, res) => {
  res.send(req.item);
});

// PUT /items/:id - update item
router.put(
  "/:id",

  requireBody(["name", "description", "image_url", "price", "type"]),
  async (req, res) => {
    const updated = await updateItemById({
      id: req.item.id,
      ...req.body,
    });

    res.send(updated);
  }
);

// DELETE /items/:id - delete item
router.delete("/:id", async (req, res) => {
  await deleteItemById(req.item.id);
  res.sendStatus(204);
});
