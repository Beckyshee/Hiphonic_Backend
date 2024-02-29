import { postSchema, postValidator } from "../validators/postValidator.js";
import { v4 } from "uuid";

import {
  sendBadRequest,
  sendCreated,
  sendNotFound,
  sendServerError,
  handleUpdateFailure,
} from "../helper/helperFunction.js";

import {
  addGroupService,
  getAllGroupsService,
  getGroupByIDService,
  updatedGroupService,
  deleteGroupService,
} from "../services/groupService.js";
import { groupValidator } from "../validators/groupValidator.js";

export const createNewGroup = async (req, res) => {
  try {
    const { GroupName, Description } = req.body;
    console.log(req.body);
   
      const GroupID = v4();
      const { error } = groupValidator( {
        GroupID,
      GroupName,
      Description,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    console.log("group id ", GroupID);
    const newGroup = {
      GroupID: v4(),
      GroupName,
      Description,
    };

    // Call service function to add Group to the database
    const response = await addGroupService(newGroup);

    if (response instanceof Error) {
      throw response;
    }

    // Check if insertion was successful
    if (response.rowsAffected && response.rowsAffected[0] === 1) {
      sendCreated(res, "Group created successfully");
    } else {
      sendServerError(res, "Failed to create Group");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAlGroups = async (req, res) => {
  try {
    const groups = await getAllGroupsService();
    //  console.log(users);

    if (groups.length > 0) {
      return res.status(200).json(groups);
    } else {
      return res.status(404).json({ error: "No groups found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getSingleGroup = async (req, res) => {
  try {
    const GroupID = req.params.GroupID;
    const group = await getGroupByIDService(GroupID);

    if (group) {
      return res.status(200).json(group);
    } else {
      // return res.status(404).json({ error: "Group not found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { GroupID } = req.params;
    console.log("request body ", req.body);
    const GroupUpdated = req.body;
    GroupUpdated.GroupID = GroupID;
    const updated = await updatedGroupService(GroupUpdated);
    console.log("updated is ", updated[0]);
    // console.log(updated);
    if (updated[0] > 0) {
      return res.status(200).json({
        GroupUpdated: req.body,
        message: "Group Updated Successfully",
      });
    } else {
      return handleUpdateFailure(res, "update failed");
    }
  } catch (error) {
    console.log("error is ", error);
    sendServerError(res, error.message);
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const GroupID = req.params.GroupID;
    const isDeleted = await deleteGroupService(GroupID);

    if (isDeleted) {
      res.status(200).json({ message: "Group deleted successfully" });
    } else {
      res.status(404).json({ error: "deletion failed" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};