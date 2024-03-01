import Joi from "joi";

const eventAttendeeSchema = Joi.object({
  EventID: Joi.number().required(),
  AttendeeID: Joi.number().required(),
});

export const eventAttendeeValidator = (eventAttendee) => {
  return eventAttendeeSchema.validate(eventAttendee);
};
