import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateToken from "../utils/genJwtToken.js";
import User from "../models/userModel.js";
import Tutor from "../models/tutorModel.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email });

  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id, "admin");
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("invalid data");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("bbbbbbbbbbbbbbbbbbbb");
  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    generateToken(res, admin._id, "admin");
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid data");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " admin logout" });
});

const userList = asyncHandler(async (req, res) => {
  const users = await User.find();
  console.log(users, "suuuuiii");
  res.status(200).json(users);
});
const tutorList = asyncHandler(async (req, res) => {
  const tutors = await Tutor.find();
  console.log(tutors, "sssssssss");
  res.status(200).json(tutors);
});

const blockUser = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const blockTrue = {
    isBlocked: true,
  };

  const blockUser = await User.findByIdAndUpdate(userId, blockTrue);
  if (blockUser) {
    res.status(200).json({ message: "user blocked sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const unblockFalse = {
    isBlocked: false,
  };
  const blockUser = await User.findByIdAndUpdate(userId, unblockFalse);

  if (blockUser) {
    res.status(200).json({ message: "user unblocked sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});
export {
  authAdmin,
  logoutAdmin,
  registerAdmin,
  userList,
  blockUser,
  unblockUser,
  tutorList,
};
