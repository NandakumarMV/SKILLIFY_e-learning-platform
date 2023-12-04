import asyncHandler from "express-async-handler";
import Tutor from "../models/tutorModel.js";
import User from "../models/userModel.js";
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
import Live from "../models/liveModel.js";
import { configureMailOptions, generateOtp } from "../utils/mailOptions.js";
import Orders from "../models/orderModel.js";
import transporter from "../utils/nodemailTransporter.js";
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
      const url = await getSignedUrl(s3, getCommand, { expiresIn: 604800 });
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
  const previewVideoName = randomImgName();

  // Upload image to S3
  const imageParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: thumbnail,
    Body: req.files.image[0].buffer,
    ContentType: req.files.image[0].mimetype,
  };
  const imageCommand = new PutObjectCommand(imageParams);
  await s3.send(imageCommand);

  // Get signed URL for the uploaded image
  const imageObjectParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: thumbnail,
  };
  const imageGetCommand = new GetObjectCommand(imageObjectParams);
  const imageUrl = await getSignedUrl(s3, imageGetCommand, {
    expiresIn: 604800,
  });

  // Upload video to S3
  const videoParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: previewVideoName,
    Body: req.files.previewVideo[0].buffer,
    ContentType: req.files.previewVideo[0].mimetype,
  };
  const videoCommand = new PutObjectCommand(videoParams);
  await s3.send(videoCommand);

  // Get signed URL for the uploaded video
  const videoObjectParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: previewVideoName,
  };
  const videoGetCommand = new GetObjectCommand(videoObjectParams);
  const videoUrl = await getSignedUrl(s3, videoGetCommand, {
    expiresIn: 604800,
  });

  // Create course with image and video URLs
  const createdCourse = await Courses.create({
    domain: domain._id,
    tutorId: tutorId,
    courseName,
    description,
    requiredSkills: requiredSkill,
    caption,
    price,
    thumbnail: imageUrl,
    previewVideo: videoUrl,
    previewVideoName: previewVideoName,
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
  const url = await getSignedUrl(s3, getCommand, { expiresIn: 604800 });

  const newVideo = {
    videoName: videoName,
    videoUrl: url,
    videoUniqueId: randomVideo,
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
const videoDelete = asyncHandler(async (req, res) => {
  const { videoId, courseId } = req.body;

  try {
    // Find the course by its ID
    const course = await Courses.findById(courseId);
    if (course) {
      if (course.videos.length === 1) {
        res.status(400).json({ message: "Course must have atleast one Video" });
      } else {
        const specificVideo = course.videos.find(
          (video) => video.videoUniqueId === videoId
        );

        if (specificVideo) {
          const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: videoId,
          };

          // Delete the video from the S3 bucket
          const command = new DeleteObjectCommand(params);
          await s3.send(command);

          // Remove the video from the videos array
          course.videos = course.videos.filter(
            (video) => video.videoUniqueId !== videoId
          );

          // Save the updated course document
          await course.save();

          res.status(200).json({ message: "Video deleted successfully" });
        } else {
          res.status(404).json({ error: "Video not found in course" });
        }
      }
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error("Error deleting video from S3:", error);
    res.status(500).json({ error: "Video deletion failed" });
  }
});
const courseDelete = asyncHandler(async (req, res) => {
  const { courseId } = req.body;

  const course = await Courses.findById(courseId);
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: course.previewVideoName,
  };
  const command = new DeleteObjectCommand(params);
  const buk = await s3.send(command);
  if (course) {
    try {
      for (const video of course.videos) {
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: video.videoUniqueId,
        };
        const command = new DeleteObjectCommand(params);
        const buk = await s3.send(command);
      }

      const result = await Courses.deleteOne({ _id: courseId });

      res
        .status(200)
        .json({ message: "Course and associated videos deleted successfully" });
    } catch (error) {
      console.error("Error deleting course and associated videos:", error);
      res.status(500).json({ error: "Course and video deletion failed" });
    }
  } else {
    res.status(404).json({ error: "Course not found" });
  }
});

const logoutTutor = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " tutor logout" });
});
const editVideo = asyncHandler(async (req, res) => {
  const { courseId, videoId, videoName } = req.body;

  const course = await Courses.findById(courseId);
  if (course) {
    const videoIndex = course.videos.findIndex(
      (video) => String(video._id) === videoId
    );
    if (videoIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found in the course" });
    }

    if (req.file) {
      const videoUniqueId = course.videos[videoIndex].videoUniqueId;
      const deleteParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: videoUniqueId,
      };
      const deleteCommand = new DeleteObjectCommand(deleteParams);
      const buk = await s3.send(deleteCommand);

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
      const url = await getSignedUrl(s3, getCommand, { expiresIn: 604800 });
      course.videos[videoIndex].videoUrl = url;
      course.videos[videoIndex].videoUniqueId = randomVideo;
    }
    if (videoName) {
      course.videos[videoIndex].videoName = videoName;
    }
    await course.save();
    res.status(200).json({ message: "Video edited successfully" });
  } else {
    return res
      .status(404)
      .json({ success: false, message: "Course not found" });
  }
});

const createLive = asyncHandler(async (req, res) => {
  const { courseId, tutorId, liveName } = req.body;

  try {
    const tutor = await Tutor.findById(tutorId);
    let lives = await Live.findOne({ tutor: tutorId });

    if (!lives) {
      // If no live session exists for the tutor, create a new Live document
      lives = new Live({
        tutor: tutorId,
        lives: [],
      });
    }

    const randomId = generateOtp(6);

    const newLive = {
      course: courseId,
      title: liveName,
      randomId,
      date: new Date(),
    };

    // Add the newLive to the lives array
    lives.lives.push(newLive);

    // Save the updated or newly created lives document
    const liveCreated = await lives.save();
    if (liveCreated) {
      const orders = await Orders.find({
        "purchasedCourses.courseId": courseId,
      });

      // Extract user IDs from the orders
      const userIds = orders.map((order) => order.userId);

      // Find user documents with the extracted user IDs
      const users = await User.find({ _id: { $in: userIds } });

      // Extract email addresses from user documents
      const emails = users.map((user) => user.email);
      console.log(emails);
      const subject = `Click on the Link to join the Live Class of ${tutor?.name.toUpperCase()} in ${liveName}`;
      const otp = `http://localhost:3000/get-live/${randomId}`;
      for (const email of emails) {
        const mailOptions = configureMailOptions(email, otp, subject);
        transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.error(error);
            throw new Error("error sending otp");
          }
        });
      }
    }

    res.status(201).json({ success: true, data: newLive });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default createLive;

export {
  registerTutor,
  getTutorProfile,
  authTutor,
  logoutTutor,
  updateTutorProfile,
  addCourse,
  addVideo,
  getAllCourses,
  videoDelete,
  courseDelete,
  editVideo,
  createLive,
};
