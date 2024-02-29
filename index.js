import express from "express";
import dotenv from "dotenv";
import logger from "./src/utils/logger.js";
import userRouter from "./src/routes/userRoutes.js";
import postRouter from "./src/routes/postRoutes.js";
import groupRouter from "./src/routes/groupRoutes.js";
import eventRouter from "./src/routes/eventRoutes.js";
// import messageRouter from "./src/routes/messageRoutes.js";
import friendshipRouter from "./src/routes/friendshipRoutes.js";
// import commentRouter from "./src/routes/commentRoutes.js";
// import photoRouter from "./src/routes/photoRoutes.js";
import bodyParser from "body-parser";
// import eventAttendeeRouter from "./src/routes/eventAttendeeRoute.js";
// import groupMembersRouter from "./src/routes/groupMemberRoutes.js";
// import emailTemp from "./emailTemp.js";
// import nodemailer from "nodemailer";
// import cron from "node-cron";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// app.use( cors( {
//   path:"*"
// }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// const sendMail = async () => {
//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: "wanjirubecky.rw@gmail.com",
//     subject: "Sending Email for Social media network!",
//     html: emailTemp,
//   };
//   try {
//     logger.info("Sending mail....");
//     await transporter.sendMail(mailOptions);
//     logger.info("Email sent successfully!");
//   } catch (error) {
//     logger.error(error);
//   }
// };

//Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/groups", groupRouter);
app.use("/api/events", eventRouter);
// app.use("/api/messages", messageRouter);
app.use("/api/friendship", friendshipRouter);
// app.use("/api/comments", commentRouter);

// app.use("/api/photos", photoRouter);
// app.use("/api/groupmembers", groupMembersRouter);
// app.use("/api/eventattendees", eventAttendeeRouter);

app.listen(port, () => {
  logger.info(`Hiphonic running on http://localhost:${port} `);
});
