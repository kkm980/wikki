const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  photo: String,
  access_token: String,
  id_token: String,
  accountId: String,
  email_verified: Boolean,
  role: {
    type: String, // Change this line to specify the type as "String"
    enum: ["admin", "user"],
    default: "user",
  },
});
module.exports = mongoose.model("user", userSchema);

// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     name: String,
//     photo: String,
//     googleId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     role: {
//       type: String, // Change this line to specify the type as "String"
//       enum: ["admin", "user"],
//       default: "user",
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     }
// });

// const User = mongoose.models.users || mongoose.model('users', userSchema);

// module.exports = User;
