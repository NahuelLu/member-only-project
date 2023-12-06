// Define schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: [true,"Why you didn't type a password, please do it!"],
      minlength: [6, 'Must be at least 6, got {VALUE}']
    },
})

// Compile model from schema
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel