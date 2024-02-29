import Joi from "joi";

const commentSchema = Joi.object({
  CommentDate: Joi.date().required(),
  Content: Joi.string().required(),
});

export const commentValidator = (comment) => {
  return commentSchema.validate(comment);
};
