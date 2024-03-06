import Joi from "joi";

const groupMembersSchema = Joi.object({
  GroupID: Joi.number().required(),
  MemberID: Joi.number().required(),
});

export const groupMembersValidator = (groupMember) => {
  return groupMembersSchema.validate(groupMember);
};
