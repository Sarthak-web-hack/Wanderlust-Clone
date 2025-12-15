const express=require("express");
const router=express.Router();
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
const {validatereview, isLoggedIn, isreviewAuthor}=require("../middleware.js");
const { newreview, deletereviewes } = require("../controller/review.js");




router.post("/:id/reviews",isLoggedIn, validatereview ,wrapsync (newreview));



//review deleting

router.delete("/:id/review/:reviewId",isLoggedIn,isreviewAuthor, wrapsync(deletereviewes));
module.exports=router;