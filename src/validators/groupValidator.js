import Joi from "joi";

const groupSchema = Joi.object({
  GroupID: Joi.string().max(255).required(),
  GroupName: Joi.string().max(255).required(),
  Description: Joi.string().allow("", null),
  CreatedDate: Joi.date().default(new Date()),
});

export const groupValidator = (group) => {
  return groupSchema.validate(group);
};
