import { v4 } from "uuid";
import {
  addPhotoService,
  getPhotoByIDService,
  getAllPhotosService,
  updatePhotoService,
  deletePhotoService,
  getPhotosByUserIDService,
} from "../services/photoService.js";
import { sendServerError } from "../helper/helperFunction.js";
import { photoValidator } from "../validators/photoValidator.js";


export const addPhoto = async (req, res) => {
  try {
    const { UserID, PhotoURL, UploadDate } = req.body;
    const PhotoID = v4();
    const { error } = photoValidator({ PhotoURL, UploadDate });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const response = await addPhotoService({
      PhotoID,
      UserID,
      PhotoURL,
      UploadDate,
    });
    console.log(response);
    if (response instanceof Error) {
      throw response;
    }

    if (response.rowsAffected && response.rowsAffected[0] === 1) {
      return res.status(201).json({ message: "Photo added successfully" });
    } else {
      return res.status(500).json({ error: "Failed to add photo" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getPhotoByID = async (req, res) => {
  try {
    const { photoID } = req.params;
    const photo = await getPhotoByIDService(photoID);

    if (photo) {
      return res.status(200).json(photo);
    } else {
      return res.status(404).json({ error: "Photo not found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
export const getPhotosByUserID = async (req, res) => {
  try {
    const { UserID } = req.params;
    const photos = await getPhotosByUserIDService(UserID);

    if (photos) {
      return res.status(200).json(photos);
    } else {
      return res.status(404).json({ error: "Photos not found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAllPhotos = async (req, res) => {
  try {
    const photos = await getAllPhotosService();

    if (photos.length > 0) {
      return res.status(200).json(photos);
    } else {
      return res.status(404).json({ error: "No photos found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const updatePhoto = async (req, res) => {
  try {
    const { PhotoID } = req.params;
    const { PhotoURL, UploadDate } = req.body;

    const { error } = photoValidator({ PhotoURL, UploadDate });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const updatedPhoto = { PhotoID, PhotoURL, UploadDate };
    const updated = await updatePhotoService(updatedPhoto);

    if (updated[0] > 0) {
      return res.status(200).json({ message: "Photo updated successfully" });
    } else {
      return res
        .status(404)
        .json({ error: "Photo not found or update failed" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const { PhotoID } = req.params;
    const isDeleted = await deletePhotoService(PhotoID);

    if (isDeleted) {
      return res.status(200).json({ message: "Photo deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ error: "Photo not found or deletion failed" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

