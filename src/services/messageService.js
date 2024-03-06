import { poolRequest, sql } from "../utils/dbConnect.js";

export const addMessageService = async (newMessage) => {
  const { SenderID, ReceiverID, Content } = newMessage;
  console.log("newMessage is: ", newMessage);
  try {
    console.log("Try made");
    const result = await poolRequest()
      // .input("MessageID", sql.VarChar(255), MessageID)
      .input("SenderID", sql.INT, SenderID)
      .input("ReceiverID", sql.INT, ReceiverID)
      .input("Content", sql.TEXT, Content)
      .query(
        "INSERT INTO Message (SenderID, ReceiverID, Content) VALUES (@SenderID, @ReceiverID, @Content)"
      );
    console.log("result", result);
    return result;
  } catch (error) {
    console.log("Error here");
    return error;
  }
};


export const getMessageBySenderIdService = async (senderId) => {
  try {
    const result = await poolRequest()
      .input("SenderId", sql.Int, senderId)
      .query("SELECT * FROM Message WHERE SenderID = @SenderId");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const getMessageBySenderAndReceiverService = async (senderID, ReceiverID) => {
    try
    {
      console.log(senderID, ReceiverID);
    const result = await poolRequest()
      .input("SenderID", sql.Int, senderID)
      .input("ReceiverID", sql.Int, ReceiverID)

      .query(
        "SELECT * FROM Message WHERE SenderID = @SenderID and ReceiverID=@ReceiverID"
      );
        
    return result.recordset;
  } catch (error) {
    throw error;
  }
};