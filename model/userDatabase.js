const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
   username: {
    type: String,
    required: [true, "Your username address is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
   role: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});



module.exports = mongoose.model("User", userSchema);