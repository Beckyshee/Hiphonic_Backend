import { Router } from "express";
import {
  addPhoto,
  getAllPhotos,
  getPhotoByID,
  updatePhoto,
  deletePhoto,
  getPhotosByUserID
} from "../controllers/photoController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const photoRouter = Router();

photoRouter.post("/", addPhoto);
photoRouter.get("/allphotos",getAllPhotos);
photoRouter.get("/:PhotoID", getPhotoByID);
photoRouter.get("/yours/:UserID", getPhotosByUserID);
photoRouter.put("/update/:PhotoID",updatePhoto);
photoRouter.delete("/delete/:PhotoID",deletePhoto);

export default photoRouter;
