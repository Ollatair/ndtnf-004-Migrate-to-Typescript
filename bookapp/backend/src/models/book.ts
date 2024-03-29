import mongoose, {Document} from "mongoose";
import { Book } from "../types/book";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    authors: {
      type: String,
      default: null,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    fileCover: {
      type: String,
      default: null,
    },
    fileName: {
      type: String,
      default: null,
    },
    fileBook: {
      type: String,
      default: null,
    },
  },
  { versionKey: false },
);
 

const Book = mongoose.model<Book & Document>("Book", bookSchema);

export default Book;