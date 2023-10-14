import asyncHandler from "express-async-handler";
import Tutor from "../models/tutorModel.js";
import generateToken from "../utils/genJwtToken.js";

const authTutor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const tutor = await Tutor.findOne({ email });
  if (tutor && !tutor.isBlocked && (await tutor.matchPassword(password))) {
    generateToken(res, tutor._id, "tutor");
    console.log(tutor._id, tutor.name, tutor.email);
    res.status(201).json({
      _id: tutor._id,
      name: tutor.name,
      email: tutor.email,
    });
  } else if (tutor.isBlocked) {
    res.status(400);
    throw new Error("You have been blocked");
  } else {
    console.log("invalid email or password");
    res.status(400);
    throw new Error("invalid email or password");
  }
});

const registerTutor = asyncHandler(async (req, res) => {
  const { name, email, password, qualification, experience } = req.body;

  console.log(name, email, password, qualification, experience, "req body");
  const tutorExists = await Tutor.findOne({ email: email });

  if (tutorExists) {
    res.status(400);
    throw new Error("user email already exists");
  }

  const tutor = await Tutor.create({
    name,
    email,
    qualification,
    experience,
    password,
  });

  if (tutor) {
    generateToken(res, tutor._id, "tutor");
    res.status(201).json({
      _id: tutor._id,
      name: tutor.name,
      email: tutor.email,
      qualification: tutor.qualification,
      experience: tutor.experience,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const logoutTutor = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " tutor logout" });
});

export { registerTutor, authTutor, logoutTutor };
