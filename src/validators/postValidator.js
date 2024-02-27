import Joi from "joi";

export const postSchema = Joi.object({
  UserID: Joi.string().required(),
  Content: Joi.string().required(),
});

export const postValidator = (post) => {
  return postSchema.validate(post);
};