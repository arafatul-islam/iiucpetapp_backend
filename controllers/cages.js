import Cage from "../models/Cage.js";
import FosterCenter from "../models/FosterCenter.js";
import { createError } from "../utils/error.js";

export const createCage = async (req, res, next) => {
  const FosterCenterId = req.params.fcenterid;
  const newCage = new Cage(req.body);

  try {
    const savedCage = await newCage.save();
    try {
      await FosterCenter.findByIdAndUpdate(FosterCenterId, {
        $push: { cages: savedCage._id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json(savedCage);
  } catch (error) {
    next(error);
  }
};

// update foster center cage
export const updateCage = async (req, res, next) => {
  const updatedCage = await Cage.findByIdAndUpdate(
    req.params.cageid,
    {
      $set: req.body,
    },
    { new: true }
  );
  try {
    res.status(200).json(updatedCage);
  } catch (error) {
    next(createError(401, error));
  }
};

// update foster center cage availability
export const updateCageAvailabilty = async (req, res, next) => {
  try {
    await Cage.updateOne(
      {
        "cageNumbers._id": req.params.cageid,
      },
      {
        $push: { "cageNumbers.$.unavailableDates": req.body.dates },
      }
    );
    res.status(200).json("cage availability updated");
  } catch (error) {
    next(createError(401, error));
  }
};

// delete foster center cage
export const deleteCage = async (req, res, next) => {
  const cageid = req.params.cageid;
  const fcenterid = req.params.fcenterid;

  try {
    await FosterCenter.findByIdAndUpdate(fcenterid, {
      $pull: { cages: cageid },
    });

    res.status(200).json(`cageid ${cageid} is deleted`);
  } catch (error) {
    next(error);
  }
};

// get a foster center cage
export const getCage = async (req, res, next) => {
  try {
    const cage = await Cage.findById(req.params.cageid);
    res.status(200).json(cage);
  } catch (error) {
    next(createError(401, error));
  }
};

export const getCages = async (req, res, next) => {
  try {
    const cages = await Cage.find();
    res.status(200).json(cages);
  } catch (error) {
    next(createError(401, error));
  }
};
