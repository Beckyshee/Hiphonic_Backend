import Joi from "joi";

const photoSchema = Joi.object({
  PhotoURL: Joi.string().max(1000).required(),
  UploadDate: Joi.date().iso().required(),
});

export const photoValidator = (photo) => {
  return photoSchema.validate(photo);
};
