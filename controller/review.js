const review=require("../models/review");
const listing=require("../models/listing");

module.exports.newreview=async(req,res)=>{
let reviewlisting=await listing.findById(req.params.id);
let newreview=new review(req.body.review);
newreview.author=req.user._id;
console.log(newreview);
reviewlisting.review.push(newreview);
await newreview.save();
await reviewlisting.save();
console.log("new review saved");
req.flash("success","new review posted!");
res.redirect(`/listing/${reviewlisting._id}`);
};


module.exports.deletereviewes=async(req,res)=>{
    let{id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull: {review:reviewId}})
    let deletedreview=await review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted!");
    res.redirect(`/listing/${id}`);
};