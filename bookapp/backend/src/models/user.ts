import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      default: null,
    },
  },
  { versionKey: false },
);

export const User = mongoose.model('user', userSchema);
