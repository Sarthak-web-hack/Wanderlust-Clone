const review=require("../models/review");
const listing=require("../models/listing");
const User=require("../models/user");

module.exports.signup=async(req,res)=>
{ 
    try{
    let{username,email,password}=req.body;
    const newuser=new User({email,username});
  const registeruser= await User.register(newuser,password);
  console.log(registeruser);
  req.login(registeruser,(err)=>
  {
    if(err)
    {
      return next(err);
    }
     req.flash("success","Welcome to wanderlast");
     res.redirect("/listing");
  })
 
    } catch(e)
    {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.login=async(req,res)=>{
  console.log("login success");
  req.flash("success","Welcome to wanderlast");
  let redirecturl=res.locals.redirecturl || "/listing";
  res.redirect(redirecturl);
};

module.exports.logout=(req,res)=>{
  req.logout((err)=>{
    if(err){
     return next(err);
    }
    req.flash("success","you logged out successfully");
    res.redirect("/listing");
  })
};