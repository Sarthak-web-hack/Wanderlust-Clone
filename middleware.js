const flash = require("connect-flash");
const user = require("./models/user");
const listing=require("./models/listing");
const expresserror=require("./utils/expresserror.js");
const {listingschema,reviewschema}=require("./schema.js");
const review = require("./models/review.js");


module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {  
       req.session.redirectUrl=req.originalUrl;          // ✅ correct method name and call
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login");
    }
    next();
};
module.exports.saverRedirect=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};
module.exports.isowner=async(req,res,next)=>{
    let {id}=req.params;
    let listinh1=await listing.findById(id);
    if(!listinh1.owner.equals(req.user._id))
    {
        req.flash("error","you are not the owner of this listing");
        return res.redirect(`/listing/${id}`);
    }
    next();
};

module.exports.prepareimage=(req,res,next)=>{
    if (req.body.listing && typeof req.body.listing.image === "string") {
        req.body.listing.image = {
            url: req.body.listing.image,
            filename: "listingimage"
        };
    }
    next();
};

module.exports.validatelisting=(req,res,next)=>{
    let {error}=listingschema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join("'");
        throw new expresserror(400,errmsg); 
    }
    else{
        next();
    }
};
module.exports.validatereview=(req,res,next)=>{
    let {error}=reviewschema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join("'");
        throw new expresserror(400,errmsg); 
    }
    else{
        next();
    }
};
module.exports.isreviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    // rename the local variable, e.g. foundReview
    console.log("author",reviewId);
    let foundReview = await review.findById(reviewId);
    if (!foundReview.author.equals(res.locals.currentuser._id)) {
        req.flash("error", "you are not the author");
        return res.redirect(`/listing/${id}`);
    }
    next();
};
