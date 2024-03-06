import { sendCreated, sendServerError } from "../helper/helperFunction.js";
import { addMessageService, getMessageBySenderAndReceiverService, getMessageBySenderIdService } from "../services/messageService.js";

export const createNewMessage = async (body,clients) => {
  // Convert the buffer data to a string
  const messageString = body.toString("utf-8");

  // Parse the string as JSON
  const messageJSON = JSON.parse(messageString);

  // Now you can access the JSON data
    console.log( "message body is", messageJSON );
    
    const response = await addMessageService( messageJSON );
    
     if (response instanceof Error) {
       throw response;
     }

if (response.rowsAffected && response.rowsAffected[0] === 1) {
  // Send WebSocket response to all connected clients
  clients.forEach((client) => {
    client.send(JSON.stringify({ type: "message", data: messageJSON }));
  });
} else {
  console.error("Failed to create message");
}
    
};


export const getMessageBySenderID = async (req, res) => {
    try
    {
      console.log("ngauhtia ",req.params)
    const { SenderID } = req.params;
    const messages = await getMessageBySenderIdService(SenderID);
    res.status(200).json(messages);
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getMessageBySenderIDReceiverID = async (ID, clients) => {
  try {
    const SenderID = ID.split("&")[0];
    const ReceiverID = ID.split("&")[1];

    const messages = await getMessageBySenderIdService( SenderID, ReceiverID );
    
      clients.forEach((client) => {
    client.emit("messages", messages);
      } );
    
    client.emit("messages", messages);
  } catch (error) {
    // Handle errors
    sendServerError(res, error.message);
  }
};