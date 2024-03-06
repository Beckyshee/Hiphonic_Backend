import Joi from "joi";

export const postSchema = Joi.object({
  UserID: Joi.number().required(),
  Content: Joi.string().required(),
  PostDate: Joi.date(),
});

export const postValidator = (post) => {
  return postSchema.validate(post);
};
