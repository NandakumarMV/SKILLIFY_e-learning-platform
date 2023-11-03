import express from "express";

const router = express.Router();
import { protect } from "../middleware/protect.js";
import { multerImage } from "../config/multerConfig.js";

import {
  authTutor,
  logoutTutor,
  registerTutor,
  updateTutorProfile,
  getTutorProfile,
  addCourse,
  addVideo,
  getAllCourses,
} from "../controllers/tutorController.js";

router.post("/login", authTutor);
router.post("/register", registerTutor);
router.post("/logout", logoutTutor);

router
  .route("/profile")
  .get(protect("tutor"), getTutorProfile)
  .put(protect("tutor"), multerImage.single("image"), updateTutorProfile);

router.post(
  "/add-course",
  protect("tutor"),
  multerImage.single("image"),
  addCourse
);
router.post(
  "/add-video",
  protect("tutor"),
  multerImage.single("video"),
  addVideo
);
router.get("/get-courses", protect("tutor"), getAllCourses);
export default router;
