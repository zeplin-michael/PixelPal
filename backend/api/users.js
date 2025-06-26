import express from "express";
const router = express.Router();
export default router;

import {
  createUser,
  getUserByUsernameAndPassword,
  getUserById,
  deleteUserById,
} from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";

router
  .route("/register")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await createUser(username, password);
      const token = await createToken({ id: user.id });
      res.status(201).send(token);
    } catch (err) {
      if (err.code === "23505") {
        // PostgreSQL unique violation
        return res.status(409).send("Username already taken.");
      }
      console.error(err);
      res.status(500).send("Internal server error.");
    }
  });

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(401).send("Invalid username or password.");

    const token = await createToken({ id: user.id });
    res.send(token);
  });

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return res.status(404).send({ error: "User not found." });
    res.send(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send({ error: "Failed to fetch user." });
  }
});

router.delete("/me", async (req, res) => {
  try {
    const user = await deleteUserById(req.user.id);
    if (!user) return res.status(404).send("User not found.");

    res.send({ message: "User account deleted.", user });
  } catch (err) {
    console.error("Failed to delete user:", err);
    res.status(500).send("Failed to delete user.");
  }
});
