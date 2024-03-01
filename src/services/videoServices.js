import { poolRequest, sql } from "../utils/dbConnect.js";

export const addVideoService = async (video) => {
  try {
    const result = await poolRequest()
      .input("UserID", sql.Int, video.UserID)
      .input("VideoURL", sql.VarChar(1000), video.VideoURL)
      .input("Category", sql.VarChar(250), video.Category.toLowerCase())
      .input("UploadDate", sql.DateTime, video.UploadDate)
      .query(
        "INSERT INTO Video ( UserID, VideoURL, Category, UploadDate) VALUES (@UserID, @VideoURL, @Category, @UploadDate)"
      );
    return result;
  } catch (error) {
    throw error;
  }
};

export const getVideoByIDService = async (VideoID) => {
  try {
    const result = await poolRequest()
      .input("VideoID", sql.Int, VideoID)
      .query("SELECT * FROM Video WHERE VideoID = @VideoID");
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

export const getVideosByUserIDService = async (UserID) => {
  try {
    const result = await poolRequest()
      .input("UserID", sql.Int, UserID)
      .query("SELECT * FROM Video WHERE UserID = @UserID");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const getVideosByCategoryService = async (Category) => {
  try {
    const result = await poolRequest()
      .input("Category", sql.VarChar, Category)
      .query("SELECT * FROM Video WHERE Category = @Category");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const getAllVideosService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM Video");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const updateVideoService = async (updatedVideo) => {
  const { VideoID, UserID, VideoURL, Category, UploadDate } = updatedVideo;
  try {
    const result = await poolRequest()
      .input("VideoID", sql.Int, VideoID)
      .input("UserID", sql.Int, UserID)
      .input("VideoURL", sql.VarChar(250), VideoURL)
      .input("Category", sql.VarChar, Category)
      .input("UploadDate", sql.DateTime, UploadDate)
      .query(
        "UPDATE Video SET VideoURL = @VideoURL, Category = @Category, UploadDate = @UploadDate WHERE VideoID = @VideoID"
      );
    return result.rowsAffected;
  } catch (error) {
    throw error;
  }
};

export const deleteVideoService = async (VideoID) => {
  try {
    const result = await poolRequest()
      .input("VideoID", sql.Int, VideoID)
      .query("DELETE FROM Video WHERE VideoID = @VideoID");
    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw error;
  }
};
