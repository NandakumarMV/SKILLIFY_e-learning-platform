import mongoose from "mongoose";

const liveSchema = new mongoose.Schema({
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tutor",
  },

  lives: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
      title: {
        type: String,
        required: true,
      },
      randomId: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },

      expired: {
        type: String,
        required: true,
        default: "false",
      },
    },
  ],
});

const Live = mongoose.model("Live", liveSchema);

export default Live;
