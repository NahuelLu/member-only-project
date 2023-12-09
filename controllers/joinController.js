const helpers = require("./helpers/functions")
const UserModel = require("../models/user")
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
process.env.SECRET_PASSCODE
const join_club_GET = [
    helpers.checkAuthentication,
    (req,res ) => {
        res.render("join-form",{
            title: "JOIN CLUB"
        })
    }
]
const join_club_POST = [
    helpers.checkAuthentication,
    body("secret_password").trim().isLength({ min: 1 }).escape(),
    body('secret_password').custom((value, { req }) => {
        return value === process.env.SECRET_PASSCODE 
    }).withMessage("That password is not the secret password, please try again"),
    asyncHandler(async (req,res,next) => {
        const errors = validationResult(req)
        const user = await UserModel.findById(req.user._id).exec()

        if (!user) { 
            const err = new Error("User not found"); 
            err.status = 404;
            return next(err); 
        }
        if(!errors.isEmpty()){
            res.render("join-form",{
                title: "Join form",
                errors: errors.array()
            })
        }else{
            user.membership_status= true
            await user.save()
            res.redirect("/")
        }
    })
]

const joinController = {
    join_club_GET,
    join_club_POST
}

module.exports = joinController