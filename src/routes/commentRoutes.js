import { Router } from "express";
import {
  getAllComments,
  addComment,
  getCommentByID,
  updateComment,
  deleteComment,
  getCommentsByPostID,
} from "../controllers/commentController.js";

const commentRouter = Router();

commentRouter.get("/allcomments", getAllComments);
commentRouter.get("/:CommentID", getCommentByID);
commentRouter.get("/post/:PostID", getCommentsByPostID);
commentRouter.post("/", addComment);
commentRouter.put("/update/:CommentID", updateComment);
commentRouter.delete("/delete/:CommentID", deleteComment);

export default commentRouter;
