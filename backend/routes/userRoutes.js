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
} from "../controllers/userController.js";
import { multerImage } from "../config/multerConfig.js";

router.post("/login", authUser);
router.post("/signup", registerUser);
router.post("/logout", logOutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect("user"), multerImage.single("image"), updateUserProfile);
router.post("/google-login", googleLogin);
export default router;
