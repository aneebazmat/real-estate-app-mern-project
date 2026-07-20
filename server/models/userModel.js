 const mongoose = require("mongoose");
const { time } = require("node:console");

 const userSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true,
     unique: true,
   },
   email: {
     type: String,
     required: true,
     unique: true,
   },
   password: {
     type: String,
     required: true,
   },
 }, {
   timestamps: true,
 },{timestamps: true});

 const User = mongoose.model("User", userSchema);
 module.exports = User;