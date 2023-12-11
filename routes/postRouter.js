const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/postController")
postRouter.get("/create", postController.post_create_GET)
postRouter.post("/create", postController.post_create_POST)
postRouter.get("/:id",postController.post_details_GET)
postRouter.get("/:id/delete", postController.post_delete_GET)
postRouter.post("/:id/delete", postController.post_delete_POST)

module.exports = postRouter