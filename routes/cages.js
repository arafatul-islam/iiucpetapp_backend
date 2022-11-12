import express from "express";
import {
  createCage,
  deleteCage,
  getCage,
  getCages,
  updateCage,
} from "../controllers/cages.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create foster center
router.post("/:fcenterid", verifyAdmin, createCage);

// update
router.put("/:id", verifyAdmin, updateCage);

// delete
router.delete("/:fcenterid/:cageid", verifyAdmin, deleteCage);

// get a foster center

router.get("/:id", getCage);

// get all foster centers

router.get("/", getCages);

export default router;
