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
  videoDelete,
  courseDelete,
  editVideo,
  createLive,
} from "../controllers/tutorController.js";
import {
  chatSend,
  createTutorRoom,
  getMessages,
  getTutorRooms,
} from "../controllers/chatController.js";

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
  multerImage.fields([
    { name: "image", maxCount: 1 },
    { name: "previewVideo", maxCount: 1 },
  ]),
  addCourse
);
router.post(
  "/add-video",
  protect("tutor"),
  multerImage.single("video"),
  addVideo
);
router.get("/get-courses", protect("tutor"), getAllCourses);

router.delete("/delete-video", protect("tutor"), videoDelete);

router.delete("/delete-course", protect("tutor"), courseDelete);

router.put(
  "/edit-video",
  protect("tutor"),
  multerImage.single("video"),
  editVideo
);

router.post("/get-or-create-tutor-room", protect("tutor"), createTutorRoom);

router.get("/get-tutor-rooms/:tutor", getTutorRooms);

router.post("/send-message", chatSend);

router.get("/get-room-messages/:roomid", getMessages);

router.post("/create-live", protect("tutor"), createLive);

export default router;
