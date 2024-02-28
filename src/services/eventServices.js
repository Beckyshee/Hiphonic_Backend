import { poolRequest, sql } from "../utils/dbConnect.js";

export const addEventService = async (newEvent) => {
  try {
    const result = await poolRequest()
      .input("EventID", sql.VarChar(255), newEvent.EventID)
      .input("EventName", sql.VarChar(255), newEvent.EventName)
      .input("Description", sql.VarChar(255), newEvent.Description)
      .input("EventDate", sql.VarChar(255), newEvent.EventDate)
      .input("Location", sql.VarChar(255), newEvent.Location)
      .input("EventPosterURL", sql.VarChar(255), newEvent.EventPosterURL)

      .query(
        "INSERT INTO Event (EventID,EventName, Description,EventDate,Location,EventPosterURL) VALUES (@EventID,@EventName, @Description, @EventDate, @Location,@EventPosterURL)"
      );
    console.log("result", result);
    return result;
  } catch (error) {
    return error;
  }
};

export const getAllEventsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Event");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const getEventsByIDService = async (EventID) => {
  try {
    const result = await poolRequest()
      .input("EventID", sql.VarChar(255), EventID)
      .query("SELECT * FROM Event WHERE EventID = @EventID");
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

export const updatedEventsService = async (updatedEvent) => {
  try {
    console.log("updated service param is ", updatedEvent);
    const result = await poolRequest()
      .input("EventID", sql.VarChar(255), updatedEvent.EventID)
      .input("EventName", sql.VarChar(255), updatedEvent.EventName)
      .input("Description", sql.VarChar(255), updatedEvent.Description)
      .input("EventDate", sql.VarChar(255), updatedEvent.EventDate)
      .input("Location", sql.VarChar(255), updatedEvent.Location)

      .query(
        `UPDATE Event SET EventName = @EventName,Description = @Description,@EventDate = EventDate,@Location = Location WHERE EventID = @EventID`
      );
    console.log("result is ", result);
    return result.rowsAffected;
  } catch (error) {
    console.log("error ", error);
    return error;
  }
};

export const deleteEventService = async (EventID) => {
  try {
    console.log("event id in service is ", EventID);
    const result = await poolRequest()
      .input("EventID", sql.VarChar(255), EventID)
      .query("DELETE FROM Event WHERE EventID = @EventID");

    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw error;
  }
};
