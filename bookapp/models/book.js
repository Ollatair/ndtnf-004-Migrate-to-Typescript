const { mongoose } = require('mongoose');

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
if (mongoose.models.Book) {
  delete mongoose.models.Book;
}

module.exports = mongoose.model('Book', bookSchema);
