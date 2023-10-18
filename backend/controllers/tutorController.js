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
      qualifications: tutor.qualifications,
      experience: tutor.experience,
      about: tutor.about,
      image: tutor.tutorImage,
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

  const tutorExists = await Tutor.findOne({ email: email });

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

const getTutorProfile = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findById(req.tutor._id);
  const tutorData = {
    _id: req.tutor._id,
    name: req.tutor.name,
    email: req.tutor.email,
    qualifications: tutor.qualifications,
    experience: tutor.experience,
    about: tutor.about,
    image: tutor.tutorImage,
  };
  res.status(200).json(tutorData);
});
const updateTutorProfile = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findById(req.tutor._id);
  console.log(tutor, "tutor");
  console.log(req.body);
  console.log(req.body.email, req.body.name);
  const email = req.body.email;
  console.log(req.body.about, "dfdsfdsfdsf");
  if (email !== tutor.email) {
    const tutorExists = await Tutor.findOne({ email: email });

    if (tutorExists) {
      res.status(400);
      throw new Error("email already exists");
    }
  }

  if (tutor) {
    (tutor.email = req.body.email || tutor.email),
      (tutor.name = req.body.name || tutor.name),
      (tutor.qualifications = req.body.qualifications || tutor.qualifications),
      (tutor.experience = req.body.experience || tutor.experience),
      (tutor.about = req.body.about || tutor.about);
    if (req.file) {
      console.log("jjjjjjjj");
      tutor.tutorImage = req.file.filename || tutor.tutorImage;
    }

    const updatedtutor = await tutor.save();
    console.log(updatedtutor.tutorImage, "updatedtutor");
    res.status(200).json({
      _id: updatedtutor._id,
      name: updatedtutor.name,
      email: updatedtutor.email,
      qualifications: updatedtutor.qualifications,
      about: updatedtutor.about,
      experience: updatedtutor.experience,
      image: updatedtutor.tutorImage,
    });
  } else {
    res.status(404);
    throw new Error("tutor not find");
  }
});
const logoutTutor = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " tutor logout" });
});

export {
  registerTutor,
  getTutorProfile,
  authTutor,
  logoutTutor,
  updateTutorProfile,
};
