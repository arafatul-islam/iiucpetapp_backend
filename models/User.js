import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide an username"],
      unique: [true, "username already exists"],
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
