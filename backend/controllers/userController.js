import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { OAuth2Client } from "google-auth-library";
import generateToken from "../utils/genJwtToken.js";

const googleClient = new OAuth2Client(
  "646376613853-opi07m71f0glecaf3lhj5iet07c27aff.apps.googleusercontent.com"
);

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && !user.isBlocked && (await user.matchPassword(password))) {
    generateToken(res, user._id, "user");
    console.log(user._id, user.name, user.email);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.userImage,
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
    generateToken(res, user._id, "user");
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

const googleLogin = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience:
      "646376613853-opi07m71f0glecaf3lhj5iet07c27aff.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();

  const name = payload.name;
  const email = payload.email;
  const userExists = await User.findOne({ email: email });
});

const getUserProfile = asyncHandler(async (req, res) => {
  console.log("get user profile");
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const email = req.body.email;
  if (email !== user.email) {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400);
      throw new Error("email already exists");
    }
  }

  if (user) {
    (user.email = req.body.email || user.email),
      (user.name = req.body.name || user.name);
    if (req.file) {
      user.userImage = req.file.filename || user.userImage;
    }

    const updatedUser = await user.save();
    console.log(updatedUser.userImage, "updatedUser.userImage");
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.userImage,
    });
  } else {
    res.status(404);
    throw new Error("user not find");
  }
});
export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
};
