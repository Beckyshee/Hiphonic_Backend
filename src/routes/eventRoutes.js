import { Router } from "express";
import {
  createNewEvent,
  deleteEvent,
  getAlEvents,
  getSingleEvent,
  updateEvent,
} from "../controllers/eventController.js";

const eventRouter = Router();

eventRouter.post("/", createNewEvent);
eventRouter.get("/allevents", getAlEvents);
eventRouter.put("/update/:EventID", updateEvent);
eventRouter.delete("/delete/:EventID", deleteEvent);
eventRouter.get("/:EventID", getSingleEvent);

export default eventRouter;
