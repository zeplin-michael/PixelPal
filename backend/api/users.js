import express from "express";
const router = express.Router();
export default router;

import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";

router
  .route("/register")
  // requireBody(["username", "password"]
  .post(async (req, res) => {
    console.log("Function!");
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
