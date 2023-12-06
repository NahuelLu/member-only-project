const UserModel = require("../models/user")

const signup_form_get = (req,res) =>{
    res.render("sign-up-form",{
        title: "Sign up form"
    })
}
const signup_form_post = async (req, res) =>{
    const user = new UserModel({
        first_name: req.body.name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        membership_status: req.body.membership_status
      })
     await user.save();
     res.redirect("/")
}

const signupController = {
    signup_form_get,
    signup_form_post
}
module.exports = signupController