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
  const { name, email, password, qualifications, experience } = req.body;

  console.log(name, email, password, qualifications, experience, "req body");
  const tutorExists = await Tutor.findOne({ email: email });
  // console.log(req.file, "tutor?");

  // const qualificationPdf = req.file.originalname;
  // console.log(qualificationPdf, "kkkkkkkk");
  if (tutorExists) {
    res.status(400);
    throw new Error("user email already exists");
  }

  const tutor = await Tutor.create({
    name,
    email,
    qualifications,
    experience,
    password,
  });
  console.log(tutor, "tutor");

  if (tutor) {
    generateToken(res, tutor._id, "tutor");
    console.log("enterd");
    res.status(201).json({
      _id: tutor._id,
      name: tutor.name,
      email: tutor.email,
      qualifications: tutor.qualifications,
      // qualificationPdf: qualificationPdf,
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
