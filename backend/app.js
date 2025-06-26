import express from "express";
const app = express();
export default app;

import usersRouter from "#api/users";
import getUserFromToken from "#middleware/getUserFromToken";
import handlePostgresErrors from "#middleware/handlePostgresErrors";
import itemsRouter from "#api/items";
import petsRouter from "#api/pets";
import petStatusRouter from "#api/pet_status";
import overallStatsRouter from "#api/pet_overall_stats";
import cors from "cors";
import morgan from "morgan";

app.use(cors({ origin: process.env.CORS_ORIGIN ?? /localhost/ }));

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(getUserFromToken);

app.get("/", (req, res) => res.send("Hello, World!"));

app.use("/pets", petsRouter);
app.use("/users", usersRouter);
app.use("/pet_status", petStatusRouter);
app.use("/pet_overall_stats", overallStatsRouter);
app.use("/items", itemsRouter);

app.use(handlePostgresErrors);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
