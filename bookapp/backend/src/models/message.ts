import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    bookid: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Message = mongoose.model("message", messageSchema);
