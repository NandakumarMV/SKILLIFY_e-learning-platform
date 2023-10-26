import express from "express";

const router = express.Router();
import { protect } from "../middleware/protect.js";
import { multerImage, multerPDF } from "../config/multerConfig.js";

import {
  authTutor,
  logoutTutor,
  registerTutor,
  updateTutorProfile,
  getTutorProfile,
  addCourse,
} from "../controllers/tutorController.js";

router.post("/login", authTutor);
router.post("/register", registerTutor);
router.post("/logout", logoutTutor);
// router.put(
//   "/profile",
//   protect("tutor"),
//   multerImage.single("image"),
//   updateTutorProfile
// );
router
  .route("/profile")
  .get(protect("tutor"), getTutorProfile)
  .put(protect("tutor"), multerImage.single("image"), updateTutorProfile);
router.post("/add-course", protect("tutor"), addCourse);
export default router;
