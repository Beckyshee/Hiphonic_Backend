import express from "express";
import dotenv from "dotenv";
import logger from "./src/utils/logger.js";
import { Server } from "socket.io";
import userRouter from "./src/routes/userRoutes.js";
import postRouter from "./src/routes/postRoutes.js";
import photoRouter from "./src/routes/photoRoutes.js";
import groupRouter from "./src/routes/groupRoutes.js";
import eventRouter from "./src/routes/eventRoutes.js";
import messageRouter from "./src/routes/messagesRoutes.js";
import friendshipRouter from "./src/routes/friendshipRoutes.js";
import commentRouter from "./src/routes/commentRoutes.js";
import bodyParser from "body-parser";

import eventAttendeeRouter from "./src/routes/eventAttendeeRoute.js";
import groupMembersRouter from "./src/routes/groupMemberRoutes.js";
import { WebSocketServer } from "ws";
// import emailTemp from "./emailTemp.js";
// import nodemailer from "nodemailer";
// import cron from "node-cron";
import cors from "cors";
import videoRouter from "./src/routes/videoRoutes.js";

import {
  createNewMessage,
  getMessageBySenderIDReceiverID,
} from "./src/controllers/messageController.js";
import notificationRouter from "./src/routes/notificationRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const io = new Server({
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});
let onlineUsers = [];
const username = "Admin";
const addNewUser = (username, socketId) => {
  const existingUserIndex = onlineUsers.findIndex(
    (user) => user.username === username
  );

  if (existingUserIndex !== -1) {
    onlineUsers[existingUserIndex].socketId = socketId;
  } else {
    onlineUsers.push({ username, socketId });
  }
  console.log("Online Users!!!:", onlineUsers); // Log online users after adding
};
console.log({ onlineUsers });

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  console.log("New socket connection:", socket.id); // Log new socket connection

  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    if (receiver) {
      io?.to(receiver.socketId).emit("getNotification", {
        senderName,
        type,
      });
    } else {
      console.log(`User '${receiverName}' not found or not connected.`);
      // Handle the case where the receiver is not found or not connected
    }
  });

  // io.emit(" ", "Hello this its test")
  // console.log("someone is in the app!!!")
  socket.on("disconnect", () => {
    removeUser(socket.id);

    console.log("someone has left the app");
  });
});

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
app.use("/api/messages", messageRouter);
app.use("/api/friendship", friendshipRouter);

app.use("/api/videos", videoRouter);

app.use("/api/photos", photoRouter);

app.use("/api/comments", commentRouter);

app.use("/api/photos", photoRouter);
app.use("/api/groupmembers", groupMembersRouter);

app.use("/api/eventattendees", eventAttendeeRouter);
app.use("/api/notifications", notificationRouter);

const server = app.listen(port, () => {
  logger.info(`Hiphonic running on http://localhost:${port} `);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (connection, req) => {
  console.log("WebSocket connected...");

  connection.on("message", (message) => {
    console.log(`Received message: ${message}`);
    createNewMessage(message, wss.clients);
  });

  connection.on("messageID", (ID) => {
    console.log(`Received message: ${ID}`);
    getMessageBySenderIDReceiverID(ID, wss.clients);
  });

  // Listen for the connection to close
  connection.on("close", () => {
    console.log("WebSocket disconnected...");
  });
});
