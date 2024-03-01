import { poolRequest, sql } from "../utils/dbConnect.js";

export const addEventAttendeeService = async (eventAttendee) => {
  try {
    const result = await poolRequest()
      .input("EventID", sql.Int, eventAttendee.EventID)
      .input("AttendeeID", sql.Int, eventAttendee.AttendeeID)
      .query(
        "INSERT INTO EventAttendee (EventID, AttendeeID) VALUES (@EventID, @AttendeeID)"
      );
    return result;
  } catch (error) {
    throw error;
  }
};

export const removeEventAttendeeService = async (EventID, AttendeeID) => {
  try {
    const result = await poolRequest()
      .input("EventID", sql.Int, EventID)
      .input("AttendeeID", sql.Int, AttendeeID)
      .query(
        "DELETE FROM EventAttendee WHERE EventID = @EventID AND AttendeeID = @AttendeeID"
      );
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllEventAttendeesService = async (EventID) => {
  try {
    const result = await poolRequest()
      .input("EventID", sql.Int, EventID)
      .query("SELECT * FROM EventAttendee WHERE EventID = @EventID");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const getAllEventsUserAttendsService = async (UserID) => {
  try {
    const result = await poolRequest()
      .input("UserID", sql.Int, UserID)
      .query(
        "SELECT Event.* FROM EventAttendee INNER JOIN Event ON EventAttendee.EventID = Event.EventID WHERE AttendeeID = @UserID"
      );
    return result.recordset;
  } catch (error) {
    throw error;
  }
};
