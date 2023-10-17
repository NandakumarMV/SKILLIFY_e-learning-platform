import express from "express";
const router = express.Router();
import { protect } from "../middleware/protect.js";
import {
  authAdmin,
  logoutAdmin,
  registerAdmin,
  blockUser,
  userList,
  unblockUser,
  tutorList,
} from "../controllers/adminController.js";

router.post("/", authAdmin);
router.post("/register", registerAdmin);
router.post("/logout", logoutAdmin);
router.get("/users", protect("admin"), userList);
router.get("/tutors", protect("admin"), tutorList);
router.post("/block-user", blockUser);
router.post("/unblock-user", unblockUser);

export default router;
