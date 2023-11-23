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
          // console.log(user, "user info");
          if (!user.isBlocked) {
            console.log("user not blocked");
            req.user = user;
          } else {
            console.log("blocked");
            res.clearCookie("userJwt");
            res.redirect("/login");
            return;
          }
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
