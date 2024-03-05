import { commentValidator } from "../validators/commentValidators.js";
import { v4 } from "uuid";
import {
  sendBadRequest,
  sendCreated,
  sendNotFound,
  sendServerError,
  handleUpdateFailure,
} from "../helper/helperFunction.js";
import {
  addCommentService,
  getCommentByIDService,
  getAllCommentsService,
  updateCommentService,
  deleteCommentService,
  getCommentsByPostIDService,
} from "../services/commentServices.js";

export const addComment = async (req, res) => {
  try {
    const { PostID, UserID, Content } = req.body;
    // const CommentID = v4();
    const CommentDate = new Date().toISOString();

    const { error } = commentValidator({
      CommentDate,
      Content,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const newComment = {
      // CommentID,
      PostID,
      UserID,
      CommentDate,
      Content,
    };

    const response = await addCommentService(newComment);

    if (response instanceof Error) {
      throw response;
    }

    if (response.rowsAffected && response.rowsAffected[0] === 1) {
      sendCreated(res, "Comment created successfully");
    } else {
      sendServerError(res, "Failed to create comment");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getCommentByID = async (req, res) => {
  try {
    const { CommentID } = req.params;
    const comment = await getCommentByIDService(CommentID);

    if (comment) {
      return res.status(200).json(comment);
    } else {
      return res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getCommentsByPostID = async (req, res) => {
  try {
    const { PostID } = req.params;
    const comments = await getCommentsByPostIDService(PostID);

    if (comments) {
      return res.status(200).json(comments);
    } else {
      return res.status(404).json({ error: "No comments found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await getAllCommentsService();

    if (comments.length > 0) {
      return res.status(200).json(comments);
    } else {
      return res.status(404).json({ error: "No comments found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const updateComment = async (req, res) => {
  try {
    const { CommentID } = req.params;
    const { Content } = req.body;

    const updatedComment = {
      CommentID,
      Content,
    };

    const updated = await updateCommentService(updatedComment);

    if (updated[0] > 0) {
      return res.status(200).json({
        commentUpdated: req.body,
        message: "Comment updated successfully",
      });
    } else {
      return handleUpdateFailure(res, "Update failed");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { CommentID } = req.params;
    const isDeleted = await deleteCommentService(CommentID);

    if (isDeleted) {
      res.status(200).json({ message: "Comment deleted successfully" });
    } else {
      res.status(404).json({ error: "Deletion failed" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
