import dotenv from 'dotenv'
 
import {poolRequest,sql} from '../utils/dbConnect.js'
// import { Int } from 'mssql';
 
dotenv.config();
 
 
export const getAllUserNotificationsService = async (UserID) => {
    try {
      const result = await poolRequest()
        .input('UserID', sql.Int, UserID)
        .query(`
          SELECT Notification.*, tbl_user.*
          FROM Notification
          INNER JOIN tbl_user ON tbl_user.userID = Notification.UserID
          WHERE Notification.UserID = @UserID
        `);
 
      console.log("result records", result.recordset);
      console.log("result", result);
      return result;
    } catch (error) {
      return error;
    }
  };
 
 
  export const getAllNotificationsService=async()=>{
    try {
        const allNotifications=await poolRequest().query("SELECT * FROM Notification")
        return allNotifications
    } catch (error) {
        return error
    }
}

export const deleteNotiicationService = async (NotificationID) => {
    try {
      console.log("Notification id in service is ", NotificationID);
      const result = await poolRequest()
        .input("NotificationID", sql.VarChar(255), NotificationID)
        .query("DELETE FROM tbl_group WHERE NotificationID = @NotificationID");
  
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    }
  };
  

// export const addNotification = async(newNotification) ={
//     const result = await poolRequest()
//     .input("UserID", sql.Int, newNotification.UserID)
//     .input("message", sql.VarChar(255))
//     .input
// } 