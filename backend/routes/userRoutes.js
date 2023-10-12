import express from "express";
const router = express.Router();
import { protect } from "../middleware/protect.js";

import {
  authUser,
  logOutUser,
  registerUser,
} from "../controllers/userController.js";

router.post("/login", authUser);
router.post("/signup", registerUser);
router.post("/logout", logOutUser);

export default router;
