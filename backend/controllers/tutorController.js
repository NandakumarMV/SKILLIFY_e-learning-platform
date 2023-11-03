import asyncHandler from "express-async-handler";
import Tutor from "../models/tutorModel.js";
import generateToken from "../utils/genJwtToken.js";
import { s3 } from "../config/s3BucketConfig.js";
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import Domain from "../models/domainModel.js";
import Courses from "../models/courseModel.js";
import { log } from "console";
const randomImgName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

const authTutor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const tutor = await Tutor.findOne({ email });
  if (tutor && !tutor.isBlocked && (await tutor.matchPassword(password))) {
    generateToken(res, tutor._id, "tutor");
    res.status(201).json({
      _id: tutor._id,
      name: tutor.name,
      email: tutor.email,
      qualifications: tutor.qualifications,
      experience: tutor.experience,
      about: tutor.about,
      image: tutor.tutorImageUrl,
    });
  } else if (tutor.isBlocked) {
    res.status(400);
    throw new Error("You have been blocked");
  } else {
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

  if (tutor) {
    generateToken(res, tutor._id, "tutor");
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
  };
  res.status(200).json(tutorData);
});
const updateTutorProfile = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findById(req.tutor._id);
  const email = req.body.email;
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
      if (tutor.tutorImageName) {
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: tutor.tutorImageName,
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
      }
      const tutorImg = randomImgName();
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: tutorImg,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);

      await s3.send(command);
      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: tutorImg,
      };
      const getCommand = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
      tutor.tutorImageName = tutorImg;
      tutor.tutorImageUrl = url;
    }

    const updatedtutor = await tutor.save();
    res.status(200).json({
      _id: updatedtutor._id,
      name: updatedtutor.name,
      email: updatedtutor.email,
      qualifications: updatedtutor.qualifications,
      about: updatedtutor.about,
      experience: updatedtutor.experience,
      image: updatedtutor.tutorImageUrl,
    });
  } else {
    res.status(404);
    throw new Error("tutor not find");
  }
});
const addCourse = asyncHandler(async (req, res) => {
  const tutorId = req.tutor._id;
  const domainName = req.body.domain;

  const domain = await Domain.findOne({ domainName });

  const { courseName, description, price, requiredSkill, caption } = req.body;
  const thumbnail = randomImgName();
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: thumbnail,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  const command = new PutObjectCommand(params);

  await s3.send(command);
  const getObjectParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: thumbnail,
  };
  const getCommand = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
  const createdCourse = await Courses.create({
    domain: domain._id,
    tutorId: tutorId,
    courseName,
    description,
    requiredSkill,
    caption,
    price,
    thumbnail: url,
  });
  res.status(201).json(createdCourse);
});

const addVideo = asyncHandler(async (req, res) => {
  const { videoName, courseId } = req.body;
  const course = await Courses.findById(courseId);
  const randomVideo = randomImgName();
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: randomVideo,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);

  await s3.send(command);
  const getObjectParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: randomVideo,
  };
  const getCommand = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
  console.log(url);

  const newVideo = {
    videoName: videoName,
    videoUrl: url,
  };
  course.videos.push(newVideo);
  await course.save();
  res.status(201).json({ url, videoName, courseId });
});
const getAllCourses = asyncHandler(async (req, res) => {
  const tutorId = req.tutor._id;
  try {
    const courses = await Courses.find({ tutorId: tutorId });

    if (courses) {
      res.status(200).json(courses);
    } else {
      res.status(404).json({ message: "No courses found for this tutor." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
  addCourse,
  addVideo,
  getAllCourses,
};
