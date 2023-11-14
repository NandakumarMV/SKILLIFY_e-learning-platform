import mongoose from "mongoose";

const commentsSchema = mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  comments: [
    {
      type: String,
    },
  ],
});

const Comments = mongoose.model("Comments", commentsSchema);
export default Comments;
