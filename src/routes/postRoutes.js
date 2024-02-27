import { Router } from "express";
import {
  createNewPost,
  getAlPosts,
  getSinglePost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const postRouter = Router();

// postRouter.post( "/", verifyToken, createNewPost );
// postRouter.get("/all/" ,getAlPosts);
// postRouter.put("/update/:PostID", verifyToken,updatePost);
// postRouter.delete("/delete/:PostID", verifyToken,deletePost);
// postRouter.get("/:PostID", getSinglePost);
postRouter.post("/", createNewPost);
postRouter.put("/update/:PostID", updatePost);
postRouter.delete( "/delete/:PostID", deletePost );
postRouter.get("/all/", getAlPosts);
postRouter.get("/:PostID", getSinglePost);


export default  postRouter