import express from "express";
const router = express.Router();
import { protect } from "../middleware/protect.js";

import {
  authUser,
  getUserProfile,
  googleLogin,
  logOutUser,
  registerUser,
  updateUserProfile,
  getApprovedCourses,
  razorpayPayment,
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
  getSuggestions,
  getTutorDetails,
} from "../controllers/userController.js";
import { multerImage } from "../config/multerConfig.js";
import {
  chatSend,
  createRoom,
  getMessages,
  getRooms,
} from "../controllers/chatController.js";

router.post("/login", authUser);

router.post("/signup", registerUser);

router.post("/logout", logOutUser);

router.post("/google-login", googleLogin);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect("user"), multerImage.single("image"), updateUserProfile);

router.get("/get-approvedCourses", getApprovedCourses);

router.get("/single-course/:courseId", protect("user"), getSingleCourse);

router.post("/payment", protect("user"), razorpayPayment);

router.post("/create-order", protect("user"), createOrder);

router.post("/verify-payment", protect("user"), razorpayPayment);

router.get("/my-courses", protect("user"), getMyCourses);

router.post("/track-video", protect("user"), trackVideos);

router.post("/course-rating", protect("user"), addCourseRating);

router.post("/course-review", protect("user"), addCourseReview);

router.post("/add-wishlist", protect("user"), addWishlist);

router.get("/get-wishlist", protect("user"), getWishlist);

router.delete("/delete-wishlist", protect("user"), deleteFromWishlist);

router.get("/get-all-wishList", protect("user"), getAllWishlist);

router.post("/forgot-password", protect("user"), forgotPassword);

router.post("/verify-otp", protect("user"), verifyOtp);

router.post("/reset-password", protect("user"), resetPassword);

router.get("/get-suggestions", getSuggestions);

router.get("/get-tutor-details/:tutorId", getTutorDetails);

//chat routes

router.post("/get-or-createroom", createRoom);

router.get("/getrooms/:userId", getRooms);

router.post("/send-message", chatSend);

router.get("/get-room-messages/:roomid", getMessages);

export default router;
