import Joi from "joi";

const eventAttendeeSchema = Joi.object({
  EventID: Joi.string().required(),
  AttendeeID: Joi.string().required(),
});

export const eventAttendeeValidator = (eventAttendee) => {
  return eventAttendeeSchema.validate(eventAttendee);
};
