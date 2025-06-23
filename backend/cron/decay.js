import db from "#db/client";
import cron from "node-cron";
import { decayPetStatusIfNeeded } from "#db/queries/pet_status";
