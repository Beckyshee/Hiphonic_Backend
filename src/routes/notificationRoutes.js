import { Router } from "express";
import { getAllNotificationsController,
        getAllUserNotificationsController,
} from "../controllers/notificationController.js";

const notificationRouter = Router();

notificationRouter.get('/all', getAllNotificationsController)
notificationRouter.get('/ByUserID/:UserID', getAllUserNotificationsController)


export default notificationRouter;