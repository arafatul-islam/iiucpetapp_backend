import express from "express";
import {
  createAdoption,
  deleteAdoption,
  getAllAdoptions,
  getOneAdoption,
  updateAdoption,
} from "../controllers/adoption.js";

const router = express.Router();

router.post("/createadoption", createAdoption);
router.put("/updateadoption/:adoptionid", updateAdoption);
router.delete("/deleteadoption/:adoptionid", deleteAdoption);
router.get("/getoneadoption/:adoptionid", getOneAdoption);
router.get("/getalladoptions", getAllAdoptions);

export default router;
