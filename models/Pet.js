import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    breed: {
      type: String,
    },
    imageLabel: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: String,
    },
    additionalImages: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pet", PetSchema);
