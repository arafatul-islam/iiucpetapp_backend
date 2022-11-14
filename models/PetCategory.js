import mongoose from "mongoose";

const PetCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("PetCategory", PetCategorySchema);
