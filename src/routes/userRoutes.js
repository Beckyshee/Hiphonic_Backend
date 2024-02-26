import { Router } from "express";
import {
  registerUser,
  loginUser,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const userRouter = Router();

userRouter.post( "/", registerUser );
userRouter.post("/login", loginUser);

userRouter.get("/allusers", getAllUsers);
userRouter.put("/update/:UserID", verifyToken,updateUser);
userRouter.delete("/delete/:UserID", verifyToken,deleteUser);
userRouter.get("/:UserID", getSingleUser);
export default userRouter;


