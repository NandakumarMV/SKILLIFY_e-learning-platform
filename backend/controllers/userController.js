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
import instance from "../utils/razorpayInstance.js";
import crypto from "crypto";
import Courses from "../models/courseModel.js";
import Orders from "../models/orderModel.js";
import Wishlist from "../models/wishListModel.js";
import { generateOtp, configureMailOptions } from "../utils/mailOptions.js";
import transporter from "../utils/nodemailTransporter.js";
import { error } from "console";
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
  const subject = " Resetting Password";
  const otp = generateOtp(6);
  const mailOptions = configureMailOptions(email, otp, subject);
  transporter.sendMail(mailOptions);
  if (userExists) {
    res.status(400);
    throw new Error("user email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    otp,
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
// const verifyUser=asyncHandler(async(req,res)=>{

// })
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
      const url = await getSignedUrl(s3, getCommand, { expiresIn: 604800 });
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
const getApprovedCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Courses.find({ approved: true })
      .populate("tutorId", "name")
      .populate("domain", "domainName")
      .populate("rating.userId", "name")
      .populate("reviews.userId", "name");

    if (!courses || courses.length === 0) {
      return res.status(200).json({ message: "There are no approved courses" });
    }

    const coursesWithAvgRating = courses.map((course) => {
      const ratings = course.rating.map((r) => r.rate);
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : 0;

      return {
        ...course.toObject(),
        averageRating,
      };
    });

    res.status(200).json(coursesWithAvgRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getSingleCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;
  let purchased = false;
  const order = await Orders.findOne({
    userId: userId,
    "purchasedCourses.courseId": courseId,
  });

  if (order) {
    purchased = true;
  }
  const course = await Courses.findById(courseId)
    .populate({
      path: "tutorId",
      select: "-password",
    })
    .populate("domain", "domainName")
    .populate("rating.userId", "name")
    .populate("reviews.userId", "name");
  if (course) {
    res.status(200).json({ course, purchased });
  } else {
    res.status(400).json({ message: "course not found" });
  }
});
const createOrder = asyncHandler(async (req, res) => {
  var options = {
    amount: Number(req.body.price * 100),
    currency: "INR",
    receipt: "order_rcptid_11" + Date.now(),
  };

  const order = await instance.orders.create(options);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("order creation failed ");
  }
});
const razorpayPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    courseId,
    price,
    userId,
    tutorId,
  } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  try {
    if (generated_signature === razorpay_signature) {
      let order = await Orders.findOne({ userId });

      if (!order) {
        order = await Orders.create({
          tutorId,
          userId,
          purchasedCourses: [],
        });
      }

      order.purchasedCourses.push({ tutorId, courseId, price });

      await order.save();

      res.status(200).json({ success: true, orderId: order._id });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
const getMyCourses = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const courses = await Orders.find({ userId: userId })
    .populate({
      path: "purchasedCourses.courseId",
      populate: {
        path: "tutorId",
        model: "Tutor",
      },
    })
    .exec();

  if (courses) {
    res.status(200).json(courses);
  } else {
    res.status(400).json({ message: "no courses purchased" });
  }
});

const trackVideos = asyncHandler(async (req, res) => {
  const { videoId, courseId } = req.body;
  const userId = req.user._id;

  const course = await Courses.findOne({
    _id: courseId,
    "videos.videoUniqueId": videoId,
  })
    .populate({
      path: "tutorId",
      select: "-password",
    })
    .populate("domain", "domainName")
    .populate("rating.userId", "name")
    .populate("reviews.userId", "name");

  if (course) {
    const video = course.videos.find((v) => v.videoUniqueId === videoId);

    if (!video.viewers.some((viewer) => viewer.userId.equals(userId))) {
      video.viewers.push({ userId });
      await course.save();
    }

    const purchased = true;
    res.status(200).json({ course, purchased });
  } else {
    res.status(404).json({ message: "Course or video not found" });
  }
});

const addCourseRating = asyncHandler(async (req, res) => {
  const { courseId, clickedRating } = req.body;
  const userId = req.user._id;
  const newRating = {
    userId,
    rate: clickedRating,
  };

  try {
    const course = await Courses.findById(courseId)
      .populate({
        path: "tutorId",
        select: "-password",
      })
      .populate("domain", "domainName")
      .populate("rating.userId", "name")
      .populate("reviews.userId", "name");
    if (course) {
      const purchased = true;
      course.rating.push(newRating);
      await course.save();
      res.status(200).json({ course, purchased });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const addCourseReview = asyncHandler(async (req, res) => {
  const { courseId, feedback } = req.body;
  const userId = req.user._id;
  const newReview = {
    userId,
    review: feedback,
  };

  try {
    const course = await Courses.findById(courseId)
      .populate({
        path: "tutorId",
        select: "-password",
      })
      .populate("domain", "domainName")
      .populate("rating.userId", "name")
      .populate("reviews.userId", "name");
    if (course) {
      const purchased = true;
      course.reviews.push(newReview);
      await course.save();
      res.status(200).json({ course, purchased });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const addWishlist = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id;

  let wishlist = await Wishlist.findOne({ userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      userId,
      wishlist: [{ course: courseId }],
    });
  } else {
    const isCourseInWishlist = wishlist.wishlist.some(
      (item) => String(item.course) === String(courseId)
    );

    if (!isCourseInWishlist) {
      wishlist.wishlist.push({ course: courseId });
      await wishlist.save();
    }
  }
  res.status(201).json(wishlist.wishlist);
});
const getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const wishlist = await Wishlist.findOne({ userId });

  if (wishlist) {
    res.status(200).json(wishlist.wishlist);
  } else {
    res.status(400).json({ message: "wishlist is empty" });
  }
});
const getAllWishlist = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log(userId);
    const wishlist = await Wishlist.findOne({ userId }).populate({
      path: "wishlist.course",
      populate: [{ path: "domain" }, { path: "tutorId" }],
    });
    // console.log(wishlist, "get all wishlist");
    if (!wishlist) {
      res.status(400).json({ message: "Wishlist not found for the user" });
      return;
    }

    res.status(200).json(wishlist.wishlist);
  } catch (error) {
    console.error("Error checking wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteFromWishlist = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user._id;
  try {
    // Find the user's wishlist
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Remove the course from the wishlist
    const deleted = (wishlist.wishlist = wishlist.wishlist.filter(
      (item) => String(item.course) !== String(courseId)
    ));
    await wishlist.save();
    res.status(200).json(wishlist.wishlist);
  } catch (error) {
    console.error("Error removing course from wishlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    const subject = " Resetting Password";
    const otp = generateOtp(6);
    const mailOptions = configureMailOptions(email, otp, subject);
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error);
        throw new Error("error sending otp");
      } else {
        const user = await User.findOneAndUpdate(
          { email: email },
          {
            $set: {
              otp: otp,
            },
          },
          { new: true }
        );
      }

      res.status(200).json({ message: "otp send successfully" });
    });
  } else {
    res.status(400).json({ message: "invaild Email" });
  }
});
const verifyOtp = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const email = req.body.email;
  const user = await User.findOne({ email: email });

  if (user) {
    if (user.otp === otp) {
      await User.updateOne({ email: email }, { $set: { isVerified: true } });
      res.status(200).json({ message: "otp is Correct" });
    } else {
      res.status(400).json({ message: "otp is not matching" });
    }
  } else {
    res.status(400).json({ message: "user not found" });
  }
});
const resetPassword = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(400).json({ message: "user not found" });
  }
  user.password = password;
  await user.save();
  res.status(200).json({ message: "Password Updated" });
});
export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
  googleLogin,
  razorpayPayment,
  getApprovedCourses,
  getSingleCourse,
  createOrder,
  getMyCourses,
  trackVideos,
  addCourseRating,
  addCourseReview,
  addWishlist,
  getWishlist,
  deleteFromWishlist,
  getAllWishlist,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
