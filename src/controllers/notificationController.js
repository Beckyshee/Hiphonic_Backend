import { getAllNotificationsService, getAllUserNotificationsService } from "../services/notificationService.js";
 
 
 
export const getAllUserNotificationsController = async (req, res) => {
    try {
      const {UserID}=req.params
      console.log(UserID);
      const results = await getAllUserNotificationsService(UserID)
      console.log(results);
       if(results.rowsAffected>0){
        const notifications=results.recordset
        console.log("notifications",notifications);
      res.status(200).json( notifications );
       }else{
        return res.status(400).send({message: "No existing notifications"});
       }
    } catch (error) {
      console.error("Error fetching all notifications:", error);
      res.status(500).json("Internal server error");
    }
  };
 
 
  export const getAllNotificationsController = async (req, res) => {
    try {
      const results = await getAllNotificationsService()
       if(results.rowsAffected>0){
        const Notifications=results.recordset
        res.status(200).json( Notifications );
       }else{
        res.status(400).json({ message: "No Notifications" });
       }
    } catch (error) {
      console.error("Error fetching all Notifications:", error);
      res.status(500).json("Internal server error");
    }
  };