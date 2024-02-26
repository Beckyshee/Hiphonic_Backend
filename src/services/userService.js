import { poolRequest, sql } from "../utils/dbConnect.js";
import bcrypt from "bcrypt";

export const addUser = async (newUser) => {
  try {
    const result = await poolRequest()
      .input("UserID", sql.VarChar(255), newUser.UserID)
      .input("Username", sql.VarChar(255), newUser.Username)
      .input("Password", sql.VarChar(255), newUser.Password)
      .input("Email", sql.VarChar(255), newUser.Email)
      .input("TagName", sql.VarChar(50), newUser.TagName)
      .input("Location", sql.VarChar(100), newUser.Location)
      .query(
        "INSERT INTO tbl_user (UserID, Username, Password, Email, TagName, Location) VALUES (@UserID, @Username, @Password, @Email, @TagName, @Location)"
      );
    console.log("result", result);
    return result;
  } catch (error) {
    return error;
  }
};
import jwt from "jsonwebtoken";

export const getUserByEmailService = async (email) => {
  try {
    const result = await poolRequest()
      .input("Email", sql.VarChar(255), email)
      .query("SELECT * FROM tbl_user WHERE Email = @Email");

    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

export const getUserByIDService = async (UserID) => {
  try {
    const result = await poolRequest()
      .input("UserID", sql.VarChar(255), UserID)
      .query("SELECT * FROM tbl_user WHERE UserID = @UserID");
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};




// export const getAllUsersService = async () => {
//   try {
//     const result = await poolRequest()
//       .query( "SELECT * FROM tbl_user" );
//     return result.recordset;
//   } catch (error) {
//     throw error;
//   }
// };
export const getAllUsersService = async () => {
  try {
    const result = await poolRequest().query(
      "SELECT UserID, Username, Email, TagName, Location FROM tbl_user"
    );
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

export const updatedUserService = async (updatedUser) => {
  try {
    const result = await poolRequest()
      .input("UserID", sql.VarChar(255), updatedUser.UserID)
      .input("Username", sql.VarChar(255), updatedUser.Username)
      .input("Email", sql.VarChar(255), updatedUser.Email)
      .input("TagName", sql.VarChar(50), updatedUser.TagName)
      .input("Location", sql.VarChar(100), updatedUser.Location)
      .input("Company", sql.VarChar(100), updatedUser.Company)
      .input("WebsiteLink", sql.VarChar(100), updatedUser.WebsiteLink)
      .query(`UPDATE tbl_user 
              SET Username = @Username, 
                  Email = @Email, 
                  TagName = @TagName, 
                  Location = @Location, 
                  Company = @Company, 
                  WebsiteLink = @WebsiteLink 
              WHERE UserID = @UserID`);
    console.log("result is ", result);
    return result.rowsAffected[0];
  } catch (error) {
    console.log("error is ", error);
    return error;
  }
};

// export const updatedUserService = async(updatedUser)=> {
//   try
//   {
//     console.log("updated service param is ",updatedUser);
//     const result = await poolRequest()
//       .input("UserID", sql.VarChar(255), updatedUser.UserID)
//       .input("Username", sql.VarChar(255), updatedUser.Username)
//       .input("Password", sql.VarChar(255), updatedUser.Password)
//       .input("Email", sql.VarChar(255), updatedUser.Email)
//       .input("TagName", sql.VarChar(50), updatedUser.TagName)
//       .input( "Location", sql.VarChar( 100 ), updatedUser.Location )
//     .query(`UPDATE tbl_user SET Username = @Username, Password = @Password, Email = @Email, TagName = @TagName, Location = @Location WHERE UserID = @UserID`)
//     console.log("result is ",result);
//     return result.rowsAffected;
//   } catch ( error )
//   {
//     console.log("error ",error);
//     return error
//   }
// };

export const deleteUserService = async (userID) => {
  try {
    console.log("user id in service is ", userID);
    const result = await poolRequest()
      .input("UserID", sql.VarChar(255), userID)
      .query("DELETE FROM tbl_user WHERE UserID = @UserID");

    return result.rowsAffected[0] > 0;
  } catch (error) {
    throw error;
  }
};


//   export const findByCredentialsService = async (user) => {
//     try
//     {
//       console.log("Service reached");
//         const userFoundResponse=await poolRequest()
//         .input('Email', sql.VarChar, user.Email)
//         .query('SELECT * FROM tbl_user WHERE Email=@Email')
     
//         if(userFoundResponse.recordset[0]){
//           if(await bcrypt.compare(user.Password,userFoundResponse.recordset[0].Password)){
     
//             let token=jwt.sign({
//               UserID:userFoundResponse.recordset[0].UserID,
//               Password:userFoundResponse.recordset[0].Password,
//               Email:userFoundResponse.recordset[0].Email
//             },process.env.JWT_SECRET,{ expiresIn: "24h" })
 
//             console.log("Token is", token);
//             const {Password,...user}=userFoundResponse.recordset[0]
//             return {user,token:`JWT ${token}`}
     
//           }else{
//             return { error: 'Invalid Credentials' };
//           }
//         }else{
//           return { error: 'Invalid Credentials' };
//         }
//       } catch (error) {
//         return error
//       }
// };
