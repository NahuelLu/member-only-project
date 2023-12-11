const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const PostModel = require("../models/post")

/* GET home page. */
const get_all_posts_GET = asyncHandler(async (req,res) => {
  const posts = await PostModel.find().populate("author").exec()
  console.log(req.user)
  res.render("index", {
    title: "Express",
    userIsLoggedIn: req.isAuthenticated(),
    membership_status: req.user? req.user.membership_status: false, // is user is logged then need to see his membership_status but if not is logged just return false
    isUserAdmin: req.user? req.user.admin : false,
    posts
  });
})
router.get('/', get_all_posts_GET)

module.exports = router;
