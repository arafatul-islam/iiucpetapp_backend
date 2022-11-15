import mongoose from "mongoose";
import Joi from "joi";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 5,
    },
    email: {
      type: String,
      required: [true, "please provide an email"],
      unique: [true, "email already exists"],
    },
    password: {
      type: String,
      min: 8,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(user);
};
export default mongoose.model("User", UserSchema);
