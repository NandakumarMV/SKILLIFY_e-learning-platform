import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
import Tutor from "../models/tutorModel.js";

const protect = (role = "user") => {
  console.log("reached protect");
  return asyncHandler(async (req, res, next) => {
    let token;
    switch (role) {
      case "admin":
        console.log("admin");
        token = req.cookies.adminJwt;
        break;
      case "tutor":
        console.log("tutor");

        token = req.cookies.tutorJwt;
        break;
      default:
        console.log("user");

        token = req.cookies.userJwt;
    }
    if (token) {
      console.log(token, "tokenn");
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if (role === "admin") {
          console.log("1");

          req.admin = await Admin.findById(decoded.adminId).select("-password");
        } else if (role === "tutor") {
          console.log("2");
          req.tutor = await Tutor.findById(decoded.tutorId).select("-password");
        } else {
          console.log("3");
          req.user = await User.findById(decoded.userId).select("-password");
          console.log(req.user);
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
  }); //eslink
};

export { protect };
