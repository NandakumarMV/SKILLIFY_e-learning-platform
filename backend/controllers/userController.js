import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import genUsertoken from "../utils/genUserToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && !user.isBlocked && (await user.matchPassword(password))) {
    genUsertoken(res, user._id);
    console.log(user._id, user.name, user.email);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else if (user.isBlocked) {
    res.status(400);
    throw new Error("You have been blocked");
  } else {
    console.log("invalid email or password");
    res.status(400);
    throw new Error("invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("user email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    genUsertoken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const logOutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " user logout" });
});

export { authUser, registerUser, logOutUser };
