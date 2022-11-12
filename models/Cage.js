import mongoose from "mongoose";

const CageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    maxPet: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cageNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

export default mongoose.model("Cage", CageSchema);
