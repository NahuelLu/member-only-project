const UserModel = require("../models/user")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const signup_form_get = (req,res) =>{
    res.render("sign-up-form",{
        title: "Sign up form"
    })
}
const signup_form_post = [
    body("name", "Empty name").trim().isLength({ min: 1 }).escape(),
    body("last_name", "Empty last name").trim().isLength({ min: 1 }).escape(),
    body("username", "Empty username").trim().isLength({ min: 1 }).escape(),
    body("password", "Empty password").trim().isLength({ min: 1 }).escape(),
    body('confirm_password').custom((value, { req }) => {
        return value === req.body.password;
    }).withMessage("Password are differently, please fix it"),
    body("membership_status", "Empty membership status").trim().isLength({ min: 1 }).escape(),
    asyncHandler( async (req, res) => {
        const errors = validationResult(req);
        const user = new UserModel({
            first_name: req.body.name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password,
            membership_status: req.body.membership_status
        })
        if (!errors.isEmpty()) {
            res.render("sign-up-form",{
                title: "Sign up form",
                user,
                errors:errors.array()
            })
        } else {
            await user.save();
            res.redirect("/")
        }
}) 
]

const signupController = {
    signup_form_get,
    signup_form_post
}
module.exports = signupController