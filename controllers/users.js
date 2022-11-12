import User from "../models/User.js";

// update user
export const updateUser = async (req, res, next) => {
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );
  try {
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

// delete foster User
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json(`id: ${req.params.id} foster User deleted`);
  } catch (error) {
    next(error);
  }
};

// get a foster User
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
