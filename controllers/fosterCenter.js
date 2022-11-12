import FosterCenter from "../models/FosterCenter.js";

// create foster center
export const createFosterCenter = async (req, res, next) => {
  const newCenter = new FosterCenter(req.body);
  try {
    const savedCenter = await newCenter.save();
    res.status(200).json(savedCenter);
  } catch (error) {
    next(err);
  }
};

// update foster center
export const updateFosterCenter = async (req, res, next) => {
  const updateCenter = await FosterCenter.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  try {
    res.status(200).json(updateCenter);
  } catch (error) {
    next(error);
  }
};

// delete foster center
export const deleteFosterCenter = async (req, res, next) => {
  try {
    await FosterCenter.findByIdAndDelete(req.params.id);
    res.status(200).json(`id: ${req.params.id} foster center deleted`);
  } catch (error) {
    next(error);
  }
};

// get a foster center
export const getFosterCenter = async (req, res, next) => {
  try {
    const fosterCenter = await FosterCenter.findById(req.params.id);
    res.status(200).json(fosterCenter);
  } catch (error) {
    next(error);
  }
};

export const getFosterCenters = async (req, res, next) => {
  try {
    const fosterCenters = await FosterCenter.find();
    res.status(200).json(fosterCenters);
  } catch (error) {
    next(error);
  }
};
