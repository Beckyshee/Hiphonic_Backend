import {
  addGroupMemberService,
  removeGroupMemberService,
  getAllGroupMembersService,
} from "../services/groupMembersServices.js";
import { sendServerError } from "../helper/helperFunction.js";

export const addGroupMember = async (req, res) => {
  try {
    const { GroupID, MemberID } = req.body;
    const response = await addGroupMemberService({ GroupID, MemberID });

    if (response instanceof Error) {
      throw response;
    }

    if (response.rowsAffected && response.rowsAffected[0] === 1) {
      return res
        .status(201)
        .json({ message: "Group member added successfully" });
    } else {
      return res.status(500).json({ error: "Failed to add group member" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const removeGroupMember = async (req, res) => {
  try {
    const { GroupID, MemberID } = req.params;
    const response = await removeGroupMemberService(GroupID, MemberID);
    console.log(response);

    if (response instanceof Error) {
      throw response;
    }

    if (response.rowsAffected && response.rowsAffected[0] === 1) {
      return res
        .status(200)
        .json({ message: "Group member removed successfully" });
    } else {
      return res.status(500).json({ error: "Failed to remove group member" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAllGroupMembers = async (req, res) => {
  try {
    const { GroupID } = req.params;
    const members = await getAllGroupMembersService( GroupID );
    console.log("members one", members);
    return res.status(200).json(members);
  } catch (error) {
    sendServerError(res, error.message);
  }
};
