import Joi from "joi";

const friendshipSchema = Joi.object({
  FriendshipDate: Joi.date().required(),
});

export const friendshipValidator = (friendship) => {
  return friendshipSchema.validate(friendship);
};
