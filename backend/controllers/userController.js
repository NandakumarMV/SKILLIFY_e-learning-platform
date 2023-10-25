import "dotenv/config.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { OAuth2Client } from "google-auth-library";
import generateToken from "../utils/genJwtToken.js";
import { s3 } from "../config/s3BucketConfig.js";
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
/////////////////////////////////
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import crypto from "crypto";
const randomImgName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");
const googleClient = new OAuth2Client(
  "646376613853-opi07m71f0glecaf3lhj5iet07c27aff.apps.googleusercontent.com"
);

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && !user.isBlocked && (await user.matchPassword(password))) {
    generateToken(res, user._id, "user");
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.userImageUrl,
    });
  } else if (user.isBlocked) {
    res.status(400);
    throw new Error("You have been blocked");
  } else {
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
  const { token } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience:
      "646376613853-opi07m71f0glecaf3lhj5iet07c27aff.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();

  const name = payload.name;
  const email = payload.email;
  const userExists = await User.findOne({ email: email });

  if (userExists !== null) {
    if (!userExists.isBlocked) {
      generateToken(res, userExists._id, "userExists");
      return res.status(201).json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
      });
    } else if (userExists.isBlocked) {
      res.status(400);
      throw new Error("You have been blocked");
    } else {
      res.status(400);
      throw new Error("invalid email or password");
    }
  }
  const user = await User.create({
    name,
    email,
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

const getUserProfile = asyncHandler(async (req, res) => {
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
  s3.destroy();

  if (user) {
    (user.email = req.body.email || user.email),
      (user.name = req.body.name || user.name);
    if (req.file) {
      if (user.userImageName) {
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: user.userImageName,
        };
        const command = new DeleteObjectCommand(params);
        const buk = await s3.send(command);
      }
      const userImg = randomImgName();
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: userImg,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      const command = new PutObjectCommand(params);

      await s3.send(command);

      //////////////////get the image url///////
      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: userImg,
      };
      const getCommand = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
      user.userImageName = userImg;
      user.userImageUrl = url;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.userImageUrl,
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
  googleLogin,
};
