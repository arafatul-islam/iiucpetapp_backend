import express from "express";
import multer from "multer";
import fs, { mkdirSync } from "fs";
import path from "path";
import {
  createPet,
  deletePet,
  getAllPets,
  getOnePet,
  updatePet,
} from "../controllers/pet.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/images")) {
      fs / mkdirSync("public/images");
    }

    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    var ext = path.extname(file.originalname);

    if (ext !== ".png" && ext !== ".jpeg" && ext !== ".jpg") {
      return cb(new Error("only images are allowed"));
    }

    cb(null, true);
  },
});
// create a pet
router.post(
  "/createpet",
  upload.fields([
    {
      name: "images",
      maxCount: 1,
    },
    { name: "additionalImages", maxCount: 5 },
  ]),
  createPet
);
// update pet
router.put(
  "/updatepet/:petid",
  upload.fields([
    {
      name: "images",
      maxCount: 1,
    },
    { name: "additionalImages", maxCount: 5 },
  ]),
  updatePet
);
// delete pet
router.delete("/deletepet/:petid", deletePet);

// get a pet
router.get("/allpets/:petid", getOnePet);
// get all pets
router.get("/allpets", getAllPets);
export default router;
