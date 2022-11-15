import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Token", TokenSchema);
