const helpers = require("./helpers/functions")
const PostModel = require("../models/post")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const post_create_GET = [
    helpers.checkAuthentication,
    (req,res) => {
    res.render("post-form",{
        title: "Create a post"
    })
}]
const post_create_POST = [
    helpers.checkAuthentication,
    body("title", "Title must not be empty.").trim().isLength({ min: 1 }).escape(),
    body("content", "Content must not be empty").trim().isLength({ min: 1 }).escape(),
    asyncHandler(async (req, res) => {
        const errors = validationResult(req)
        const post = new PostModel({
            author:req.user._id,
            title: req.body.title,
            content: req.body.content
        })
        if(!errors.isEmpty()){
            res.render("post-form",{
                title : "Create a post",
                post,
                errors: errors.array()
            })
        }else{
            await post.save()
            res.redirect(post.url)
        }
    })
]
const post_details_GET = (req,res) => {
    res.send("This route/url/endpoint still in development, used to obtain details of one post with GET method")
}


const postController = {
    post_create_GET,
    post_create_POST,
    post_details_GET
}

module.exports = postController