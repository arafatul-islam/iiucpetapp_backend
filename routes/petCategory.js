import express from "express";
import {
  createPetCategory,
  deletePetCategory,
  getAllPetCategories,
  updatePetCategory,
} from "../controllers/petCategory.js";

const router = express.Router();

// get all media
router.get("/all", getAllPetCategories);

// // post create new media
router.post("/createpetcategory", createPetCategory);

// // update new media
router.put("/updatepetcategory/:id", updatePetCategory);

// // delete new media
router.delete("/deletepetcategory/:id", deletePetCategory);

export default router;
