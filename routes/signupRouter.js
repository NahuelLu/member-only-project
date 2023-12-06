var express = require('express');
var router = express.Router();
const signupController = require("../controllers/signupController")

router.get('/', signupController.signup_form_get)
router.post('/', signupController.signup_form_post);

module.exports = router;
