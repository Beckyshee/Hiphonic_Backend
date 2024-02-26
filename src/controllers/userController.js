import bcrypt from "bcrypt";
import { v4 } from "uuid";
import {
  addUser,
  getUserByEmailService,
  getUserByIDService,
  getAllUsersService,
  updatedUserService,
  deleteUserService,
  // findByCredentialsService,
} from "../services/userService.js";
import {
  userValidator,
  userLoginValidator,
} from "../validators/userValidators.js";
import {
  sendBadRequest,
  sendCreated,
  sendNotFound,
  sendServerError,
  handleUpdateFailure,
  // notAuthorized,
} from "../helper/helperFunction.js";
import jwt from "jsonwebtoken";
import joi from 'joi';
import { verifyToken } from "../middleware/verifyToken.js";

import nodemailer from "nodemailer";
import cron from "node-cron";

import emailTemp from "../../emailTemp.js";
import logger from "../utils/logger.js";

// export const createNewUser = async (req, res) => {

//   // Validate user data

//   try {
//     const {
//       Username,
//       Password,
//       Email,
//       TagName,
//       Location,
//     } = req.body;
//     console.log(req.body)
//       const { error } = userValidator({
//         Username,
//         Password,
//         Email,
//         TagName,
//         Location,
//       });
//      if (error) {
//        return res.status(400).send(error.details[0].message);
//      }

//     const hashedPassword = await bcrypt.hash(Password, 10);
//     const UserID = v4();

//     // Create user object with hashed password and generated UserID
//     const newUser = {
//       UserID,
//       Username,
//       Password: hashedPassword,
//       Email,
//       TagName,
//       Location,
//     };
// console.log("user",newUser);
//     // Call service function to add user to the database
//     const response = await addUser( newUser );
//     console.log("res",response);
//     if (response instanceof Error) {
//       throw response;
//     }

//     // Check if insertion was successful
//     if (response.rowsAffected && response.rowsAffected[0] === 1) {
//       sendCreated(res, "User created successfully");
//     } else {
//       sendServerError(res, "Failed to create user");
//     }
//   } catch (error) {
//     sendServerError(res, error.message);
//   }
// };

const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { Username, Password, Email, TagName, Location } = req.body;
    console.log(req.body);
    const { error } = userValidator({
      Username,
      Password,
      Email,
      TagName,
      Location,
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const existingUser = await getUserByEmailService(Email);

    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const UserID = v4();

    const newUser = {
      UserID,
      Username,
      Password: hashedPassword,
      Email,
      TagName,
      Location,
    };

    const response = await addUser(newUser);

    if (response instanceof Error) {
      throw response;
    }

    if (response.rowsAffected && response.rowsAffected[0] === 1) {
      sendMail(newUser.Email);
      sendCreated(res, "User created successfully");
    } else {
      sendServerError(res, "Failed to create user");
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const sendMail = async (email) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Sending Email for Social media network!",
    html: emailTemp,
  };
  try {
    logger.info("Sending mail....");
    await transporter.sendMail(mailOptions);
    logger.info("Email sent successfully!");
  } catch (error) {
    logger.error(error);
  }
};





// Login a user
export const loginUser = async (req, res) => {
  try {
    const { error } = userLoginValidator(req.body);
    if (error) {
      return sendBadRequest(res, error.details[0].message);
    }

    const { Email, Password } = req.body;
    const user = await getUserByEmailService(Email);
    if (!user) {
      return sendNotFound(res, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return sendBadRequest(res, "Invalid password");
    }
    const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });

    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const UserID = req.params.UserID;
    const user = await getUserByIDService(UserID);

    if (user) {
      return res.status(200).json(user);
    } else {
      // return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    //  console.log(users);

    if (users.length > 0) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({ error: "No users found" });
    }
  } catch (error) {
    sendServerError(res, error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      console.log(req.params);
      const { UserID } = req.params;
      const { Username, Email, TagName, Location, Company, WebsiteLink } =
        req.body;
      const updatedUser = {
        UserID,
        Username,
        Email,
        TagName,
        Location,
        Company,
        WebsiteLink,
      };
      console.log("about to update");
      const updated = await updatedUserService(updatedUser);
      console.log("Updated user");

      if (updated > 0) {
        return res.status(200).json({
          userUpdated: updatedUser,
          message: "User Updated Successfully",
        });
      } else {
        return handleUpdateFailure(res, "Update failed");
      }
    });
  } catch (error) {
    console.log(error);
    sendServerError(res, error.message);
  }
};

// export const updateUser = async (req, res) => {
//   try {
//     verifyToken(req, res, async () => {
//       const { UserID } = req.params;
//       const UserUpdated = req.body;
//       UserUpdated.UserID = UserID;
//       const updated = await updatedUserService(UserUpdated);

//       if (updated[0] > 0) {
//         return res.status(200).json({
//           userUpdated: req.body,
//           message: "User Updated Successfully",
//         });
//       } else {
//         return handleUpdateFailure(res, "update failed");
//       }
//     });
//   } catch (error) {
//     sendServerError(res, error.message);
//   }
// };

export const deleteUser = async (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const userID = req.params.UserID;
      const isDeleted = await deleteUserService(userID);

      if (isDeleted) {
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ error: "deletion failed" });
      }
    });
  } catch (error) {
    sendServerError(res, error.message);
  }
};
