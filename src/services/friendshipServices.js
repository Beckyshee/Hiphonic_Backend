import { poolRequest, sql } from "../utils/dbConnect.js";

export const addFriendshipService = async (newFriendship) => {
  const { FriendshipID, User1ID, User2ID, FriendshipDate } = newFriendship;
  console.log("newFriendship is: ", newFriendship);
  try {
    console.log("Try made");
    const result = await poolRequest()
      // .input("FriendshipID", sql.VarChar(255), FriendshipID)
      .input("User1ID", sql.Int, User1ID)
      .input("User2ID", sql.Int, User2ID)
      .input("FriendshipDate", sql.DateTime, FriendshipDate)
      .query(
        "INSERT INTO Friendship (User1ID, User2ID, FriendshipDate) VALUES (@User1ID, @User2ID, @FriendshipDate)"
      );
    console.log("result", result);
    return result;
  } catch (error) {
    console.log("Error here");
    return error;
  }
};

export const getAllFriendshipsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Friendship");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const getFriendshipByIDService = async (FriendshipID) => {
  try {
    const result = await poolRequest()
      .input("FriendshipID", sql.Int, FriendshipID)
      .query("SELECT * FROM Friendship WHERE FriendshipID = @FriendshipID");
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

export const getFriendsOfAUserService = async (UserID) => {
  try {
    const result = await poolRequest()
      .input("UserID", sql.Int, UserID)
      .query(
        "SELECT tbl_user.Username, tbl_user.TagName,tbl_user.UserID FROM tbl_user INNER JOIN Friendship ON tbl_user.UserID = Friendship.User2ID WHERE Friendship.User1ID = @UserID"
      );
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const updateFriendshipService = async (updatedFriendship) => {
  try {
    console.log("updated service param is ", updatedFriendship);
    const result = await poolRequest()
      .input("FriendshipID", sql.Int, updatedFriendship.FriendshipID)
      .input("User1ID", sql.Int, updatedFriendship.User1ID)
      .input("User2ID", sql.Int, updatedFriendship.User2ID)
      .input("FriendshipDate", sql.DateTime, updatedFriendship.FriendshipDate)
      .query(
        `UPDATE Friendship SET User1ID = @User1ID, User2ID = @User2ID, FriendshipDate = @FriendshipDate WHERE FriendshipID = @FriendshipID`
      );
    console.log("result is ", result);
    return result.rowsAffected;
  } catch (error) {
    console.log("error ", error);
    return error;
  }
};

export const deleteFriendshipService = async (FriendshipID) => {
  try {
    console.log("friendship id in service is ", FriendshipID);
    const result = await poolRequest()
      .input("FriendshipID", sql.Int, FriendshipID)
      .query("DELETE FROM Friendship WHERE FriendshipID = @FriendshipID");

    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw error;
  }
};

export const deleteFriendshipByIDService = async (User1ID, User2ID) => {
  try {
    // console.log("friendship id in service is ", FriendshipID);
    const result = await poolRequest()
      .input("User1ID", sql.Int, User1ID)
      .input("User2ID", sql.Int, User2ID)
      .query(
        "DELETE FROM Friendship WHERE User1ID = @User1ID AND User2ID = @User2ID"
      );

    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw error;
  }
};