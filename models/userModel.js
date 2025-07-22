import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

export const userModel = model("user", userSchema);
