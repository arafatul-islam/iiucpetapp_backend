import express from "express";
import { createPetCategory, deletePetCategory, getAllPetCategories, updatePetCategory } from "../controllers/petCategory.js";

const router = express.Router();

// get all media
router.get("/all", getAllPetCategories);

// // post create new media
router.post("/create", createPetCategory)

// // update new media
router.put('/update/:id', updatePetCategory)

// // delete new media
router.delete('/delete/:id', deletePetCategory)

export default router;
