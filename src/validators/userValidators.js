
import Joi from "joi";
import { getUserByEmailService } from "../services/userService.js";

const userSchema = Joi.object({
  Username: Joi.string().min(3).max(255).required(),
  Password: Joi.string().min(6).max(255).required(),
  Email: Joi.string().email().max(255).required(),
  TagName: Joi.string().max(50).allow("", null),
  Location: Joi.string().max(100).allow("", null),
});

export const userValidator = async (user) => {
  const { error } = userSchema.validate(user);
  if (error) return { error };

  // Check if the email already exists
  const existingUser = await getUserByEmailService(user.Email);
  if (existingUser) {
    return { error: { details: [{ message: "Email is already registered" }] } };
  }

  return {};
};




export const userLoginValidator = (user) => {
  const userValidatorSchema = Joi.object({
    Email: Joi.string().email().max(255).required(),
    Password: Joi.string().min(6).max(255).required(),
  });
  return userValidatorSchema.validate(user);
};


