import Joi from "joi";

const videoSchema = Joi.object({
  UserID: Joi.number(),
  VideoURL: Joi.string().max(1000).required(),
  Category: Joi.string().required(),
  UploadDate: Joi.date().iso(),
});

export const videoValidator = (video) => {
  return videoSchema.validate(video);
};
