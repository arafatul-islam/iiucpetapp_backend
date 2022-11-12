import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const findUser = username
      ? await User.findOne({ username })
      : await User.findOne({ email });

    if (!findUser) {
      return next(createError(404, "opps! user not found."));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      findUser.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "wrong password or username!!"));
    }

    const token = jwt.sign(
      { id: findUser._id, isAdmin: findUser.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = findUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(otherDetails);
  } catch (error) {
    return next(error);
  }
};
