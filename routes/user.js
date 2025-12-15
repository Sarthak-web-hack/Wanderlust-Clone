const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapsync = require("../utils/wrapsync.js");
const passport = require("passport");
const { saverRedirect } = require("../middleware.js");
const { login,signup, logout } = require("../controller/users.js");

router.route("/signup")
.get((req,res)=>{
    res.render("users/signup.ejs");
})
.post(wrapsync(signup));


router.route("/login")
.get((req,res)=>{
    res.render("users/login.ejs");
})
.post(saverRedirect, 
   passport.authenticate("local", {
  failureRedirect:"/login",
  failureFlash:true
}),(login));

// router.post("/login",
//     passport.authenticate("local",
//     {failureRedirect:"/login",
//     failureFlash:true}),
//   (req,res)=>{
//     console.log("login");
//        req.flash("success","Welcome to wanderlast");
//         res.redirect("/listing");
// });



//logout route
router.get("/logout",(logout));
module.exports=router;
 