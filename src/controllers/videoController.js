import { sendServerError } from "../helper/helperFunction.js";
import {
  addVideoService,
  deleteVideoService,
  getAllVideosService,
  getVideoByIDService,
  getVideosByCategoryService,
  getVideosByUserIDService,
  updateVideoService,
} from "../services/videoServices.js";
import { videoValidator } from "../validators/videoValidator.js";

export const addVideo = async (req, res) => {
  try {
    const { UserID, VideoURL, Category, UploadDate } = req.body;

    const { error } = videoValidator({
      UserID,
      VideoURL,
      Category,
      UploadDate,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const response = await addVideoService({
      UserID,
      VideoURL,
      Category,
      UploadDate,
    });
    console.log(response);
    if (response instanceof Error) {
      throw response;
    }

    if (response.rowsAffected && response.rowsAffected[0] === 1) {
      return res.status(201).json({ message: "Video added successfully" });
    } else {
      return res.status(500).json({ error: "Failed to add video" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getVideoByID = async (req, res) => {
  try {
    const { VideoID } = req.params;
    const video = await getVideoByIDService(VideoID);

    if (video) {
      return res.status(200).json(video);
    } else {
      return res.status(404).json({ error: "Video not found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getVideosByUserID = async (req, res) => {
  try {
    const { UserID } = req.params;
    const videos = await getVideosByUserIDService(UserID);

    if (videos) {
      return res.status(200).json(videos);
    } else {
      return res.status(404).json({ error: "Videos not found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getVideosByCategory = async (req, res) => {
  try {
    const { Category } = req.params;
    const videos = await getVideosByCategoryService(Category);

    if (videos) {
      return res.status(200).json(videos);
    } else {
      return res.status(404).json({ error: "Videos not found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await getAllVideosService();

    if (videos.length > 0) {
      return res.status(200).json(videos);
    } else {
      return res.status(404).json({ error: "No videos found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { VideoID, UserID } = req.params;
    const { VideoURL, Category, UploadDate } = req.body;

    const { error } = videoValidator({ VideoURL, Category, UploadDate });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const updatedVideo = { VideoURL, Category, UploadDate };
    const updated = await updateVideoService(updatedVideo);

    if (updated[0] > 0) {
      return res.status(200).json({ message: "Video updated successfully" });
    } else {
      return res
        .status(404)
        .json({ error: "Video not found or update failed" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { VideoID } = req.params;
    const isDeleted = await deleteVideoService(VideoID);

    if (isDeleted) {
      return res.status(200).json({ message: "Video deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ error: "Video not found or deletion failed" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
