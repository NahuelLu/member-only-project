const express = require('express');
const adminRouter = express.Router();
const adminController = require("../controllers/adminController")
adminRouter.get("/", adminController.admin_permission_GET)
adminRouter.post("/", adminController.admin_permission_POST)

module.exports = adminRouter