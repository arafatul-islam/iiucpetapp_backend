import FosterCenter from "../models/FosterCenter.js";
import Cage from "../models/Cage.js";

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
  const { min, max, ...otherQueries } = req.query;
  try {
    const fosterCenters = await FosterCenter.find({
      ...otherQueries,
      cheapestPrice: { $gt: min | 1, $lt: max || 100 },
    }).limit(req.query.limit);
    res.status(200).json(fosterCenters);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return FosterCenter.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  const types = req.query.types.split(",");
  try {
    const list = await Promise.all(
      types.map((type) => {
        return FosterCenter.countDocuments({ type: type });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getFosterCenterCages = async (req, res, next) => {
  try {
    const fosterCenter = await FosterCenter.findById(req.params.fcenterid);
    const list = await Promise.all(
      fosterCenter?.cages.map((cage) => {
        return Cage.findById(cage);
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
