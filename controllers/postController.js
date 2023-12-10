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

const post_details_GET = asyncHandler(async (req, res) => {
    const post = await PostModel.findById(req.params.id).populate("author").exec()
    const userIsLoggedIn = req.isAuthenticated()
    if(post === null){
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
    }
    if(req.user){
        res.render("post-detail",{ 
            userIsLoggedIn, 
            post,
            membership_status: req.user.membership_status 
        })
    }else{
        res.render("post-detail",{ 
            userIsLoggedIn, 
            post,
            membership_status: false 
        })
    }
})


const postController = {
    post_create_GET,
    post_create_POST,
    post_details_GET
}

module.exports = postController