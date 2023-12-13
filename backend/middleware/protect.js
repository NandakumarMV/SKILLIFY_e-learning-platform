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
        } else if (role === "tutor") {
          req.tutor = await Tutor.findById(decoded.id).select("-password");
        } else {
          const user = await User.findById(decoded.id).select("-password");
          if (!user.isBlocked) {
            req.user = user;
          } else {
            res.clearCookie("userJwt");
            res.status(403);
            throw new Error("User  have been blocked");
          }
        }
        next();
      } catch (error) {
        res.status(403);
        throw new Error("Invalid token");
      }
    } else {
      res.status(403);
      throw new Error("User  have been blocked");
    }
  });
};

export { protect };
