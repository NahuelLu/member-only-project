// Define schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {DateTime} = require("luxon")

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
    timestamp:{ type: Date, default: Date.now },
    content:{
        type:String,
        required:[true,"You must to write some content to the post!"]
    }
})

// Compile model from schema
PostSchema.virtual("url").get(function () {
    return `/post/${this._id}`;
  });
PostSchema.virtual("timestamp_formatted").get(function () {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.TIME_WITH_SECONDS);
});

const PostModel = mongoose.model("posts", PostSchema);

module.exports = PostModel