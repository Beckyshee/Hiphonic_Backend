import {
  addEventAttendeeService,
  removeEventAttendeeService,
  getAllEventAttendeesService,
} from "../services/eventAttendeeServices.js";
import { sendServerError } from "../helper/helperFunction.js";
import { getAllEventsUserAttendsService } from "../services/eventAttendeeServices.js";

export const addEventAttendee = async (req, res) => {
  try {
    const { EventID, AttendeeID } = req.body;
    const response = await addEventAttendeeService({ EventID, AttendeeID });

    if (response instanceof Error) {
      throw response;
    }

    if (response.rowsAffected && response.rowsAffected[0] === 1) {
      return res
        .status(201)
        .json({ message: "Event attendee added successfully" });
    } else {
      return res.status(500).json({ error: "Failed to add event attendee" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const removeEventAttendee = async (req, res) => {
  try {
    const { EventID, AttendeeID } = req.params;
    const response = await removeEventAttendeeService(EventID, AttendeeID);

    if (response instanceof Error) {
      throw response;
    }

    if (response.rowsAffected && response.rowsAffected[0] === 1) {
      return res
        .status(200)
        .json({ message: "Event attendee removed successfully" });
    } else {
      return res.status(500).json({ error: "Failed to remove event attendee" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAllEventAttendees = async (req, res) => {
  try {
    const { EventID } = req.params;
    const attendees = await getAllEventAttendeesService(EventID);
    return res.status(200).json(attendees);
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAllEventsUserAttends = async (req, res) => {
  try {
    console.log("controller reached");
    const { UserID } = req.params;
    const events = await getAllEventsUserAttendsService(UserID);
    return res.status(200).json(events);
  } catch (error) {
    sendServerError(res, error.message);
  }
};
