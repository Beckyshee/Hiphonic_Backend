import { eventValidator } from "../validators/eventValidators.js";
import { v4 } from "uuid";
import {
  sendBadRequest,
  sendCreated,
  sendNotFound,
  sendServerError,
  handleUpdateFailure,
} from "../helper/helperFunction.js";
import {
  addEventService,
  updatedEventsService,
  deleteEventService,
  getAllEventsService,
  getEventsByIDService,
} from "../services/eventServices.js";

export const createNewEvent = async (req, res) => {
  try {
    const { EventName, Description, EventDate, Location, EventPosterURL } =
      req.body;

    // const EventID = v4();
    console.log(req.body);
    const { error } = eventValidator({
      EventName,
      Description,
      EventDate,
      Location,
      EventPosterURL,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    // console.log("event id ", EventID);
    const newEvent = {
      // EventID,
      EventName,
      Description,
      EventDate,
      Location,
      EventPosterURL,
    };
    console.log("event", newEvent);

    const response = await addEventService(newEvent);

    if (response instanceof Error) {
      throw response;
    }

    if (response.rowsAffected && response.rowsAffected[0] === 1) {
      sendCreated(res, "Event created successfully");
    } else {
      sendServerError(res, "Failed to create Event");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAlEvents = async (req, res) => {
  try {
    const events = await getAllEventsService();
    //  console.log(users);

    if (events.length > 0) {
      return res.status(200).json(events);
    } else {
      return res.status(404).json({ error: "No events found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getSingleEvent = async (req, res) => {
  try {
    const EventID = req.params.EventID;
    const event = await getEventsByIDService(EventID);

    if (event) {
      return res.status(200).json(event);
    } else {
      // return res.status(404).json({ error: "event not found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { EventID } = req.params;

    const EventUpdated = req.body;
    EventUpdated.EventID = EventID;
    const updated = await updatedEventsService(EventUpdated);
    console.log("updated is ", updated[0]);
    // console.log(updated);
    if (updated[0] > 0) {
      return res.status(200).json({
        userUpdated: req.body,
        message: "Event Updated Successfully",
      });
    } else {
      return handleUpdateFailure(res, "update failed");
    }
  } catch (error) {
    console.log("error is ", error);
    sendServerError(res, error.message);
  }
};

export const deleteEvent = async (req, res) => {
  try {
    console.log(req.params);
    const EventID = req.params.EventID;
    const isDeleted = await deleteEventService(EventID);

    if (isDeleted) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ error: "deletion failed" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
