import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import Tutor from "../models/tutorModel.js";

const protect = (role = "user") => {
  return asyncHandler(async (req, res, next) => {
    let token;
    switch (role) {
      case "admin":
        token = req.cookies.adminJwt;
        break;
      case "tutor":
        token = req.cookies.tutorJwt;
        break;
      default:
        token = req.cookies.userJwt;
    }
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (role === "admin") {
          req.admin = await Admin.findById(decoded.id).select("-password");
          // req.admin = await Admin.findById(decoded.adminId).select("-password");
        } else if (role === "tutor") {
          req.tutor = await Tutor.findById(decoded.id).select("-password");
          // req.tutor = await Tutor.findById(decoded.tutorId).select("-password");
        } else {
          req.user = await User.findById(decoded.id).select("-password");
          // req.user = await User.findById(decoded.userId).select("-password");
        }
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized");
    }
  });
};

export { protect };
