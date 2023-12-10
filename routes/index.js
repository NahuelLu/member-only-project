const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const PostModel = require("../models/post")

/* GET home page. */
const get_all_posts_GET = asyncHandler(async (req,res) => {
  const posts = await PostModel.find().populate("author").exec()
  if(req.user){
    res.render("index", {
      title: "Express",
      userIsLoggedIn: req.isAuthenticated(),
      membership_status: req.user.membership_status, // Pass the entire request object to the template
      posts
    });
  } else{
    res.render("index", {
      title: "Express",
      userIsLoggedIn: false,
      membership_status: false, // Pass the entire request object to the template
      posts
    });
  }
})
router.get('/', get_all_posts_GET)

module.exports = router;
