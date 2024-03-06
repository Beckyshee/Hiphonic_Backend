import { Router } from "express";
import {
  createNewFriendship,
  deleteFriendship,
  deleteFriendshipByID,
  getAllFriendships,
  getFriendsOfUser,
  getSingleFriendship,
  updateFriendship,
} from "../controllers/friendshipController.js";

const friendshipRouter = Router();

friendshipRouter.post("/", createNewFriendship);
friendshipRouter.get("/allfriends", getAllFriendships);
friendshipRouter.get("/:FriendshipID", getSingleFriendship);
friendshipRouter.get("/friends/:UserID", getFriendsOfUser);
friendshipRouter.put("/update/:FriendshipID", updateFriendship);
// friendshipRouter.delete( "/delete/:FriendshipID", deleteFriendship );
friendshipRouter.delete("/deleted/:User1ID/:User2ID", deleteFriendshipByID);

export default friendshipRouter;
