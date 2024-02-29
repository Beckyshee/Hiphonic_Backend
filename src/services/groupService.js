
import { poolRequest, sql } from "../utils/dbConnect.js";

export const addGroupService = async (newGroup) => {
  try {
    const result = await poolRequest()
      .input("GroupID", sql.VarChar(255), newGroup.GroupID)
      .input("GroupName", sql.VarChar(255), newGroup.GroupName)
      .input("Description", sql.VarChar(255), newGroup.Description)

      .query(
        "INSERT INTO tbl_group (GroupID,GroupName, Description) VALUES (@GroupID,@GroupName,@Description)"
      );
    console.log("result", result);
    return result;
  } catch (error) {
    return error;
  }
};

export const getAllGroupsService = async () => {
  try {
    const result = await poolRequest().query("SELECT * FROM tbl_group");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const getGroupByIDService = async (GroupID) => {
  try {
    const result = await poolRequest()
      .input("GroupID", sql.VarChar(255), GroupID)
      .query("SELECT * FROM tbl_group WHERE GroupID = @GroupID");
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

export const updatedGroupService = async (updatedGroup) => {
  try {
    console.log("updated service param is ", updatedGroup);
    const result = await poolRequest()
      .input("GroupID", sql.VarChar(255), updatedGroup.GroupID)
      .input("GroupName", sql.VarChar(255), updatedGroup.GroupName)
      .input("Description", sql.VarChar(255), updatedGroup.Description)
      .query(
        `UPDATE tbl_group SET GroupName = @GroupName,Description = @Description WHERE GroupID = @GroupID`
      );
    console.log("result is ", result);
    return result.rowsAffected;
  } catch (error) {
    console.log("error ", error);
    return error;
  }
};

export const deleteGroupService = async (GroupID) => {
  try {
    console.log("group id in service is ", GroupID);
    const result = await poolRequest()
      .input("GroupID", sql.VarChar(255), GroupID)
      .query("DELETE FROM tbl_group WHERE GroupID = @GroupID");

    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw error;
  }
};
