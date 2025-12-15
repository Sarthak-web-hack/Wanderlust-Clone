const express=require("express");
const router=express.Router({mergeParams:true});
const mongoose=require("mongoose");
const path=require('path');
const listing=require("../models/listing.js");
const { title } = require("process");
const methodOverride=require("method-override");
const { url } = require("inspector");
const wrapsync=require("../utils/wrapsync.js");
const expresserror=require("../utils/expresserror.js");
const { error } = require("console");
const {listingschema,reviewschema}=require("../schema.js")
const review=require("../models/review.js");
const listings=require("../routes/listing.js");
const { route } = require("./review.js");
const flash=require("connect-flash");
const {isLoggedIn, isowner,prepareimage,validatelisting}=require("../middleware.js");
const { index, rendernewfrom, showroute, createroute, editroute, updateroute, deleteroute } = require("../controller/listing.js");
const multer=require("multer");
const {storage}=require("../cloudconfigg.js");
const upload=multer({storage});
//new route //create route
router.route("/")
.get(wrapsync(index))
.post(isLoggedIn,
    upload.single("listing[image]"),validatelisting,
    wrapsync(createroute));
// //new route

 router.get("/new",isLoggedIn,(rendernewfrom));



router.route("/:id")
.get(wrapsync(showroute))
.put(isLoggedIn,isowner,upload.single("listing[image]"),prepareimage, wrapsync(updateroute))
.delete(isLoggedIn,isowner, wrapsync(deleteroute));




//edit route
router.get("/:id/edit",isLoggedIn, isowner, wrapsync(editroute));

//show route



// router.post("/listingnew",wrapsync(async(req,res,next)=>{
//     let  result=  listingschema.validate(req.body);
//     console.log(result);
//     const newlisting=new listing(req.body.listing);
//    if(result.error){
//     throw new expresserror(400,result.error);
//    }
    
//     await newlisting.save();
//     res.redirect("/listing");
//     })
// );

//update route

//delete route

//review posting 
module.exports=router;