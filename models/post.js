// Define schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author:{ 
        type: Schema.Types.ObjectId,
        ref: "users",
        required:[true, "You must to define an author to create a post!"]
    },
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
const PostModel = mongoose.model("posts", PostSchema);

module.exports = PostModel