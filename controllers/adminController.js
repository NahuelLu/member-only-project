const aux = require("./helpers/functions")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const UserModel = require("../models/user")

const admin_permission_GET = [
    aux.checkAuthentication,
    (req,res) => {
        res.render("admin-form",{
            title: "Admin Form"
        })
    }
]
const admin_permission_POST = [
    aux.checkAuthentication,
    body("admin_password").trim().isLength({ min: 1 }).escape(),
    body('admin_password').custom((value, { req }) => {
        return value === process.env.ADMIN_SECRET_PASSWORD 
    }).withMessage("That password is not the secret password, please try again"),
    asyncHandler(async (req,res) =>{
        const errors = validationResult(req)
        const user = await UserModel.findById(req.user._id).exec()

        if (!user) { 
            const err = new Error("User not found"); 
            err.status = 404;
            return next(err); 
        }
        console.log(user)
        if(!errors.isEmpty()){
            res.render("admin-form",{
                title: "Admin form",
                errors: errors.array()
            })
        }else{
            user.admin=true
            await user.save()
            console.log(user)
            res.redirect("/")
        }
    })
]
const adminController = {
    admin_permission_GET,
    admin_permission_POST
}

module.exports = adminController