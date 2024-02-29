import { friendshipValidator } from "../validators/friendshipValidator.js";
import { v4 } from "uuid";
import {
  sendBadRequest,
  sendCreated,
  sendNotFound,
  sendServerError,
  handleUpdateFailure,
} from "../helper/helperFunction.js";
import {
  addFriendshipService,
  getAllFriendshipsService,
  getFriendshipByIDService,
  updateFriendshipService,
  deleteFriendshipService,
  getFriendsOfAUserService,
} from "../services/friendshipServices.js";
import { getUserByIDService } from "../services/userService.js";

export const createNewFriendship = async (req, res) => {
  const { User1ID, User2ID, FriendshipDate } = req.body;
  try {
    const User1 = await getUserByIDService(User1ID);
    //console.log("User 1: ", User1);
    if (User1) {
      const User2 = await getUserByIDService(User2ID);
      //console.log("User 2: ", User2);
      if (User2 && User1 !== User2) {
        // const FriendshipID = v4();

        const { error } = friendshipValidator({
          FriendshipDate,
        });

        if (error) {
          return res.status(400).send(error.details[0].message);
        }

        const newFriendship = {
          // FriendshipID,
          User1ID,
          User2ID,
          FriendshipDate,
        };
        const response = await addFriendshipService(newFriendship);
        //console.log(response);

        if (response instanceof Error) {
          throw response;
        }

        if (response.rowsAffected && response.rowsAffected[0] === 1) {
          sendCreated(res, "Friendship created successfully");
        } else {
          sendServerError(res, "Failed to create Friendship");
        }
      } else {
        res.status(400).send("User to follow not found");
      }
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAllFriendships = async (req, res) => {
  try {
    const friendships = await getAllFriendshipsService();

    if (friendships.length > 0) {
      return res.status(200).json(friendships);
    } else {
      return res.status(404).json({ error: "No friendships found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getSingleFriendship = async (req, res) => {
  try {
    const FriendshipID = req.params.FriendshipID;
    const friendship = await getFriendshipByIDService(FriendshipID);

    if (friendship) {
      return res.status(200).json(friendship);
    } else {
      return res.status(404).json({ error: "Friendship not found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getFriendsOfUser = async (req, res) => {
  try {
    console.log("Try made");
    const UserID = req.params.UserID;
    const friends = await getFriendsOfAUserService(UserID);
    console.log(friends);
    if (friends) {
      return res.status(200).json(friends);
    } else {
      return res
        .status(404)
        .json({ error: "User has no friends at the moment" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const updateFriendship = async (req, res) => {
  try {
    const { FriendshipID } = req.params;

    const FriendshipUpdated = req.body;
    FriendshipUpdated.FriendshipID = FriendshipID;
    const updated = await updateFriendshipService(FriendshipUpdated);

    if (updated[0] > 0) {
      return res.status(200).json({
        friendshipUpdated: req.body,
        message: "Friendship Updated Successfully",
      });
    } else {
      return handleUpdateFailure(res, "Update failed");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const deleteFriendship = async (req, res) => {
  try {
    console.log(req.params);
    const FriendshipID = req.params.FriendshipID;
    const isDeleted = await deleteFriendshipService(FriendshipID);

    if (isDeleted) {
      res.status(200).json({ message: "Friendship deleted successfully" });
    } else {
      res.status(404).json({ error: "Deletion failed" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
