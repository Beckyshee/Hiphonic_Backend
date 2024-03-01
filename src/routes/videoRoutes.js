import { Router } from "express";
import {
  addVideo,
  deleteVideo,
  getAllVideos,
  getVideoByID,
  getVideosByCategory,
  getVideosByUserID,
  updateVideo,
} from "../controllers/videoController.js";

const videoRouter = Router();

videoRouter.post("/", addVideo);
videoRouter.get("/", getAllVideos);
videoRouter.get("/:VideoID", getVideoByID);
videoRouter.get("/user/:UserID", getVideosByUserID);
videoRouter.get("/category/:category", getVideosByCategory); //Buggy
videoRouter.put("/update/:VideoID", updateVideo); //Buggy
videoRouter.delete("/delete/:VideoID", deleteVideo);

export default videoRouter;
