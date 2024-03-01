import { Router } from "express";
import {
  addEventAttendee,
  removeEventAttendee,
  getAllEventAttendees,
  getAllEventsUserAttends,
} from "../controllers/eventAttendeeController.js";

const eventAttendeeRouter = Router();

eventAttendeeRouter.post("/", addEventAttendee);
eventAttendeeRouter.delete("/:EventID/:AttendeeID", removeEventAttendee);
eventAttendeeRouter.get("/:EventID/all", getAllEventAttendees);
eventAttendeeRouter.get("/:UserID", getAllEventsUserAttends);

export default eventAttendeeRouter;
