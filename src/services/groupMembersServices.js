import { poolRequest, sql } from "../utils/dbConnect.js";

export const addGroupMemberService = async (groupMember) => {
  try {
    const result = await poolRequest()
      .input("GroupID", sql.Int, groupMember.GroupID)
      .input("MemberID", sql.Int, groupMember.MemberID)
      .query(
        "INSERT INTO GroupMembers (GroupID, MemberID) VALUES (@GroupID, @MemberID)"
      );
    return result;
  } catch (error) {
    throw error;
  }
};

export const removeGroupMemberService = async (GroupID, MemberID) => {
  try
  {
    const result = await poolRequest()
    .input("GroupID", sql.VarChar(255), GroupID)
    .input("MemberID", sql.VarChar(255), MemberID)
    .query(
      "DELETE FROM GroupMembers WHERE GroupID = @GroupID AND MemberID = @MemberID"
      );
      return result;
      console.log(result);
  } catch (error) {
    throw error;
  }
};

export const getAllGroupMembersService = async (GroupID) => {
  try {
    const result = await poolRequest()
      .input("GroupID", sql.VarChar(255), GroupID)
      .query("SELECT * FROM GroupMembers WHERE GroupID = @GroupID");
    return result.recordset;
  } catch (error) {
    throw error;
  }
};
