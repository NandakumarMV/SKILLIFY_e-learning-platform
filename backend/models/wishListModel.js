import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  wishlist: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    },
  ],
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
