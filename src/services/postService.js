import { poolRequest, sql } from "../utils/dbConnect.js";

export const addPost = async (newPost) => {
  try {
    const result = await poolRequest()
      .input("PostID", sql.VarChar(255), newPost.PostID)
      .input("UserID", sql.VarChar(255), newPost.UserID)
      .input("Content", sql.VarChar(255), newPost.Content)

      .query(
        "INSERT INTO Post (PostID,UserID, Content) VALUES (@PostID,@UserID, @Content)"
      );
    console.log("result", result);
    return result;
  } catch (error) {
    return error;
  }
};


export const getAllPostsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Post");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const getPostByIDService = async (PostID) => {
  try {
    const result = await poolRequest()
      .input("PostID", sql.VarChar(255), PostID)
      .query("SELECT * FROM Post WHERE PostID = @PostID");
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

export const updatedPostService = async (updatedPost) => {
  try {
    console.log("updated service param is ", updatedPost);
    const result = await poolRequest()
      .input("PostID", sql.VarChar(255), updatedPost.PostID)
      .input("Content", sql.VarChar(255), updatedPost.Content)
      .query(`UPDATE Post SET Content = @Content WHERE PostID = @PostID`);
    console.log("result is ", result);
    return result.rowsAffected;
  } catch (error) {
    console.log("error ", error);
    return error;
  }
};

export const deletePostService = async (PostID) => {
  try {
    console.log("post id in service is ", PostID);
    const result = await poolRequest()
      .input("PostID", sql.VarChar(255), PostID)
      .query("DELETE FROM Post WHERE PostID = @PostID");

    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw error;
  }
};
