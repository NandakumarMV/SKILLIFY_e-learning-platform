import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
    },
    otpExpirationTime: {
      type: Date,
    },
    password: {
      type: String,
      required: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    userImageUrl: {
      type: String,
    },
    userImageName: {
      type: String,
    },
    purchasedCourses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Courses",
        },
        price: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
