import { Router } from "express";
import { createNewGroup, deleteGroup, getAlGroups, getSingleGroup, updateGroup } from "../controllers/groupControlller.js";


const groupRouter = Router();

groupRouter.post("/", createNewGroup);
groupRouter.get("/allgroups", getAlGroups);
groupRouter.put("/:GroupID", updateGroup);
groupRouter.delete("/delete/:GroupID", deleteGroup);
groupRouter.get( "/:GroupID", getSingleGroup );

export default groupRouter;
