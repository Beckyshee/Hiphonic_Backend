import { postSchema, postValidator } from "../validators/postValidator.js";
import { v4 } from "uuid";
import {
  sendBadRequest,
  sendCreated,
  sendNotFound,
  sendServerError,
  handleUpdateFailure,
} from "../helper/helperFunction.js";
import { addPost, deletePostService, getAllPostsService, getPostByIDService, updatedPostService } from "../services/postService.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const createNewPost = async (req, res) => {
  // Validate post data
  const PostID = v4();
  try {
    const { UserID, Content } = req.body;
    console.log(req.body);
    const { error } = postValidator({
      UserID,
      Content,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const newPost = {
      PostID,
      UserID,
      Content,
    };
    console.log("post", newPost);
    // Call service function to add post to the database
    const response = await addPost(newPost);
    console.log("res", response);
    if (response instanceof Error) {
      throw response;
    }

    // Check if insertion was successful
    if (response.rowsAffected && response.rowsAffected[0] === 1) {
      sendCreated(res, "Post created successfully");
    } else {
      sendServerError(res, "Failed to create Post");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAlPosts = async (req, res) => {
  try {
    const posts = await getAllPostsService();

    if (posts.length > 0) {
      return res.status(200).json(posts);
    } else {
      return res.status(404).json({ error: "No posts found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const PostID = req.params.PostID;
    const post = await getPostByIDService(PostID);

    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    sendServerError(res, error.message); 
  }
};

export const updatePost = async (req, res) => {
  try {
    const { PostID } = req.params;
    const { Content } = req.body;
    const updatedPost = { PostID, Content };
    const updated = await updatedPostService(updatedPost);

    if (updated[0] > 0) {
      return res.status(200).json({
        postUpdated: updatedPost,
        message: "Post Updated Successfully",
      });
    } else {
      return handleUpdateFailure(res, "Update failed");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postID = req.params.PostID;
    const isDeleted = await deletePostService(postID);

    if (isDeleted) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ error: "Deletion failed" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};
