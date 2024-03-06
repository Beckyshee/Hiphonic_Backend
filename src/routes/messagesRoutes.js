import { Router } from "express";
import {
  createNewMessage,
  getMessageBySenderID,
  getMessageBySenderIDReceiverID,
} from "../controllers/messageController.js";

const messageRouter = Router();

// messageRouter.get("/allcomments", getAllComments);
messageRouter.get( "/:SenderID", getMessageBySenderID );
messageRouter.get("/both/:ID/", getMessageBySenderIDReceiverID);

;
// messageRouter.post("/", createNewMessage);
// messageRouter.put("/update/:CommentID", updateComment);
// messageRouter.delete("/delete/:CommentID", deleteComment);

export default messageRouter;
