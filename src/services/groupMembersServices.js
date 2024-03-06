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
  try {
    const result = await poolRequest()
      .input("GroupID", sql.Int, GroupID)
      .input("MemberID", sql.Int, MemberID)
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
      .input("GroupID", sql.Int, GroupID)
      .query(
        `SELECT 
    tbl_user.UserID,
    tbl_user.UserName,
    GroupMembers.GroupID
FROM 
    GroupMembers
INNER JOIN 
    tbl_user ON tbl_user.UserID = GroupMembers.MemberID
WHERE 
    GroupMembers.GroupID = @GroupID;
`
      );
    console.log("result", result);
    return result.recordset;
  } catch (error) {
    return error;
  }
};
