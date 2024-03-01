import { Router } from "express";
import {
  addGroupMember,
  getAllGroupMembers,
  removeGroupMember,
} from "../controllers/groupMembersController.js";

const groupMembersRouter = Router();

groupMembersRouter.post("/", addGroupMember);
groupMembersRouter.delete("/:GroupID/:MemberID", removeGroupMember);
groupMembersRouter.get("/:GroupID/all", getAllGroupMembers);

export default groupMembersRouter;
