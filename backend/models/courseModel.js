import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
  },
  videoName: {
    type: String,
  },
});
const courseSchema = mongoose.Schema(
  {
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutor",
    },
    domain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
    },
    courseName: {
      type: String,
    },
    description: {
      type: String,
    },
    requiredSkills: {
      type: String,
    },
    price: {
      type: Number,
    },
    rating: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    thumbnail: {
      type: String,
    },
    caption: {
      type: String,
    },
    videos: [videoSchema],
  },
  {
    timestamps: true,
  }
);
const Courses = mongoose.model("Courses", courseSchema);
export default Courses;
