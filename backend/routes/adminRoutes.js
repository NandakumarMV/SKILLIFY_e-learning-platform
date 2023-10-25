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
  tutorunblockUser,
  tutorblockUser,
  addDomain,
  getDomains,
} from "../controllers/adminController.js";

router.post("/", authAdmin);
router.post("/register", registerAdmin);
router.post("/logout", logoutAdmin);
router.get("/users", protect("admin"), userList);
router.get("/tutors", protect("admin"), tutorList);
router.get("/domains", protect("admin"), getDomains);
router.post("/block-user", blockUser);
router.post("/unblock-user", unblockUser);
router.post("/unblock-tutor", tutorunblockUser);
router.post("/block-tutor", tutorblockUser);

router.post("/add-domain", addDomain);

export default router;
