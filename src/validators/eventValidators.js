import Joi from "joi";

const eventSchema = Joi.object({
  EventName: Joi.string().max(255).required(),
  Description: Joi.string().allow("", null),
  EventDate: Joi.date().required(),
  Location: Joi.string().max(100).required(),
  EventPosterURL: Joi.string().max(255).allow("", null),
});

export const eventValidator = (event) => {
  return eventSchema.validate(event);
};
