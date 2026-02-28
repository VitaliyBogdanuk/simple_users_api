const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    age: {
      type: Number,
      min: 0,
      max: 150
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
