import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js";
import generateToken from "../utils/genJwtToken.js";
import User from "../models/userModel.js";
import Tutor from "../models/tutorModel.js";
import Domain from "../models/domainModel.js";
import Courses from "../models/courseModel.js";
import Orders from "../models/orderModel.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email });

  if (admin && (await admin.matchPassword(password))) {
    generateToken(res, admin._id, "admin");
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("invalid data");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const admin = await Admin.create({
    name,
    email,
    password,
  });

  if (admin) {
    generateToken(res, admin._id, "admin");
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid data");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " admin logout" });
});

const userList = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});
const tutorList = asyncHandler(async (req, res) => {
  const tutors = await Tutor.find();

  res.status(200).json(tutors);
});

const blockUser = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const blockTrue = {
    isBlocked: true,
  };

  const blockUser = await User.findByIdAndUpdate(userId, blockTrue);
  if (blockUser) {
    res.status(200).json({ message: "user blocked sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const unblockFalse = {
    isBlocked: false,
  };
  const blockUser = await User.findByIdAndUpdate(userId, unblockFalse);

  if (blockUser) {
    res.status(200).json({ message: "user unblocked sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});
const tutorblockUser = asyncHandler(async (req, res) => {
  const tutorId = req.body.tutorId;
  const blockTrue = {
    isBlocked: true,
  };

  const blockUser = await Tutor.findByIdAndUpdate(tutorId, blockTrue);
  if (blockUser) {
    res.status(200).json({ message: "user blocked sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const tutorunblockUser = asyncHandler(async (req, res) => {
  const tutorId = req.body.tutorId;
  const unblockFalse = {
    isBlocked: false,
  };
  const blockUser = await Tutor.findByIdAndUpdate(tutorId, unblockFalse);

  if (blockUser) {
    res.status(200).json({ message: "user unblocked sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});
const getDomains = asyncHandler(async (req, res) => {
  const domains = await Domain.find();
  res.status(200).json(domains);
});
const addDomain = asyncHandler(async (req, res) => {
  const domainName = req.body.domainName;
  const domainExists = await Domain.find({ domainName: domainName });

  if (domainExists.length > 0) {
    res.status(400).json({ message: "domain already exits" });
  } else {
    if (Domain.domainName !== domainName) {
      const domain = await Domain.create({
        domainName,
      });
      res.status(200).json({ domain });
    } else {
      res.status(400).json({ message: "domain already exits" });
    }
  }
});
const deleteDomain = asyncHandler(async (req, res) => {
  const domainId = req.params.domainId;

  const coursesWithDomain = await Courses.find({ domain: domainId });
  if (coursesWithDomain.length > 0) {
    return res.status(404).json({ message: "Domain has associated courses" });
  }
  const deleteDomain = await Domain.findByIdAndDelete(domainId);
  if (deleteDomain) {
    res.status(200).json({ message: "domain deleted Successfully" });
  } else {
    res.status(404).json({ message: "domain not found" });
  }
});
const allCourses = asyncHandler(async (req, res) => {
  const courses = await Courses.find()
    .populate("tutorId", "name")
    .populate("domain", "domainName");
  res.status(200).json(courses);
});
const approveCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const approve = { approved: true, rejected: false };
  const course = await Courses.findByIdAndUpdate(courseId, approve);
  if (course) {
    res.status(200).json({ message: "successfully updated the course" });
  } else {
    res.status(404).json({ Error: "Course not found" });
  }
});
const rejectCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const reject = { approved: false, rejected: true };
  const course = await Courses.findByIdAndUpdate(courseId, reject);
  if (course) {
    res.status(200).json({ message: "successfully updated the course" });
  } else {
    res.status(404).json({ Error: "Course not found" });
  }
});
const totalRevenue = asyncHandler(async (req, res) => {
  try {
    // Calculate total revenue
    const result = await Orders.aggregate([
      {
        $unwind: "$purchasedCourses", // Deconstruct the array
      },
      {
        $group: {
          _id: null,
          totalPrice: { $sum: "$purchasedCourses.price" }, // Calculate the sum
        },
      },
    ]);

    // The result will be an array with one element containing the total price
    const total = result.length > 0 ? result[0].totalPrice : 0;

    // Calculate tutor share and site share
    const tutorShare = 0.7 * total;
    const siteShare = 0.3 * total;

    // Send the shares and status in the response
    res.status(200).json({
      success: true,
      data: {
        total,
        tutorShare,
        siteShare,
      },
      message: "Total revenue and shares calculated successfully.",
    });
  } catch (error) {
    // Handle any errors that occurred during the calculation
    console.error("Error calculating total revenue:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

export {
  authAdmin,
  logoutAdmin,
  registerAdmin,
  userList,
  blockUser,
  unblockUser,
  tutorList,
  tutorblockUser,
  tutorunblockUser,
  addDomain,
  getDomains,
  deleteDomain,
  allCourses,
  approveCourse,
  rejectCourse,
  totalRevenue,
};
