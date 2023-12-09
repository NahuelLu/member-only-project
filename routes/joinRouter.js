const express = require("express")
const joinRouter = express.Router()
const joinController = require("../controllers/joinController")
joinRouter.get("/", joinController.join_club_GET)
joinRouter.post("/", joinController.join_club_POST)

module.exports = joinRouter