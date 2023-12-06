// Define schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    timestamp:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:[true,"You must to write some content to the post!"]
    }
})

// Compile model from schema
const PostModel = mongoose.model("users", PostSchema);

module.exports = PostModel