import { poolRequest, sql } from "../utils/dbConnect.js";

export const addPost = async (newPost) => {
  try {
    const result = await poolRequest()
      // .input("PostID", sql.VarChar(255), newPost.PostID)
      .input("UserID", sql.Int, newPost.UserID)
      .input("Content", sql.VarChar(255), newPost.Content)
      .input("PostDate", sql.DateTime, newPost.PostDate)

      .query(
        "INSERT INTO Post (UserID, Content, PostDate) VALUES (@UserID, @Content, @PostDate)"
      );
    console.log("result", result);
    return result;
  } catch (error) {
    return error;
  }
};

export const getAllPostsService = async () => {
  try {
    const result = await poolRequest().query(
      "SELECT Post.*, tbl_user.Username, tbl_user.TagName FROM Post INNER JOIN tbl_user ON Post.UserID = tbl_user.UserID"
    );
    console.log(result.recordset);
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const getPostByIDService = async (PostID) => {
  try {
    const result = await poolRequest()
      .input("PostID", sql.Int, PostID)
      .query("SELECT * FROM Post WHERE PostID = @PostID");
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

export const getPostsByUserIDService = async (UserID) => {
  try {
    console.log("Service reached");
    const result = await poolRequest()
      .input("UserID", sql.Int, UserID)
      .query(
        "SELECT Post.*, tbl_user.Username, tbl_user.TagName FROM Post INNER JOIN tbl_user ON Post.UserID = tbl_user.USERID WHERE Post.UserID = @UserID"
      );
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const updatedPostService = async (updatedPost) => {
  try {
    console.log("updated service param is ", updatedPost);
    const result = await poolRequest()
      .input("PostID", sql.Int, updatedPost.PostID)
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
      .input("PostID", sql.Int, PostID)
      .query("DELETE FROM Post WHERE PostID = @PostID");

    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw error;
  }
};
