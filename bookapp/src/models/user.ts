const { Schema, model } = require('mongoose');

const userSchema = new Schema(
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

module.exports = model('user', userSchema);
