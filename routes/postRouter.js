const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/postController")
postRouter.get("/create", postController.post_create_GET)
postRouter.post("/create", postController.post_create_POST)
postRouter.get("/:id",postController.post_details_GET)

module.exports = postRouter