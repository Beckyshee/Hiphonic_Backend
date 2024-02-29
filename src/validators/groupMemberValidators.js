import Joi from "joi";

const groupMembersSchema = Joi.object({
  GroupID: Joi.string().required(),
  MemberID: Joi.string().required(),
});

export const groupMembersValidator = (groupMember) => {
  return groupMembersSchema.validate(groupMember);
};
