import express from "express";
import {
  countByCity,
  countByType,
  createFosterCenter,
  deleteFosterCenter,
  getFosterCenter,
  getFosterCenters,
  getFosterCenterCages,
  updateFosterCenter,
} from "../controllers/fosterCenter.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create foster center
router.post("/", verifyAdmin, createFosterCenter);

// update
router.put("/update/:id", verifyAdmin, updateFosterCenter);

// delete
router.delete("/delete/:id", verifyAdmin, deleteFosterCenter);

// get a foster center

router.get("/find/:id", getFosterCenter);

// get all foster centers

router.get("/find", getFosterCenters);
router.get("/countbycity", countByCity);
router.get("/countbytype", countByType);
router.get("/cage/:fcenterid", getFosterCenterCages);

export default router;
