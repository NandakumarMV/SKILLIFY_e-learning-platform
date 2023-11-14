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
} from "../controllers/userController.js";
import { multerImage } from "../config/multerConfig.js";

router.post("/login", authUser);

router.post("/signup", registerUser);

router.post("/logout", logOutUser);

router.post("/google-login", googleLogin);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect("user"), multerImage.single("image"), updateUserProfile);

router.get("/get-approvedCourses", protect("user"), getApprovedCourses);

router.get("/single-course/:courseId", protect("user"), getSingleCourse);

router.post("/payment", protect("user"), razorpayPayment);

router.post("/create-order", protect("user"), createOrder);

router.post("/verify-payment", protect("user"), razorpayPayment);

router.get("/my-courses", protect("user"), getMyCourses);

export default router;
