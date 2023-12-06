// Define schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
      type: String,
      required: true,
      trim: true
    },
    last_name: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type:String,
      required: true
    },
    password: {
      type: String,
      required: [true,"Why you didn't type a password, please do it!"],
      minlength: [6, 'Must be at least 6, got {VALUE}']
    },
    membership_status:{
      type: String,
      required:true
    },
    posts: [{ 
      type: Schema.Types.ObjectId,
      ref: "posts"
    }]
})

// Compile model from schema
const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel