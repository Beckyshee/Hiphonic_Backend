import { poolRequest, sql } from "../utils/dbConnect.js";


export const addCommentService = async (newComment) => {
  try {
    const result = await poolRequest()
      // .input("CommentID", sql.VarChar(255), newComment.CommentID)
      .input("PostID", sql.VarChar(255), newComment.PostID)
      .input("UserID", sql.VarChar(255), newComment.UserID)
      .input("CommentDate", sql.DateTime, newComment.CommentDate)
      .input("Content", sql.Text, newComment.Content)
      .query(
        "INSERT INTO Comment (PostID, UserID, CommentDate, Content) VALUES (@PostID, @UserID, @CommentDate, @Content)"
      );
    return result;
  } catch (error) {
    throw error;
  }
};


export const getCommentByIDService = async (CommentID) => {
  try {
    const result = await poolRequest()
      .input("CommentID", sql.VarChar(255), CommentID)
      .query("SELECT * FROM Comment WHERE CommentID = @CommentID");
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};


export const getAllCommentsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Comment");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};


export const updateCommentService = async (updatedComment) => {
  try {
    const result = await poolRequest()
      .input("CommentID", sql.VarChar(255), updatedComment.CommentID)
      .input("Content", sql.Text, updatedComment.Content)
      .query(
        "UPDATE Comment SET Content = @Content WHERE CommentID = @CommentID"
      );
    return result.rowsAffected;
  } catch (error) {
    throw error;
  }
};

export const deleteCommentService = async (CommentID) => {
  try {
    const result = await poolRequest()
      .input("CommentID", sql.VarChar(255), CommentID)
      .query("DELETE FROM Comment WHERE CommentID = @CommentID");
    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw error;
  }
};
