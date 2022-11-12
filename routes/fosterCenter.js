import express from "express";
import {
  createFosterCenter,
  deleteFosterCenter,
  getFosterCenter,
  getFosterCenters,
  updateFosterCenter,
} from "../controllers/fosterCenter.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create foster center
router.post("/", verifyAdmin, createFosterCenter);

// update
router.put("/:id", verifyAdmin, updateFosterCenter);

// delete
router.delete("/:id", verifyAdmin, deleteFosterCenter);

// get a foster center

router.get("/:id", getFosterCenter);

// get all foster centers

router.get("/", getFosterCenters);

export default router;
