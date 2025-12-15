const mongoose=require("mongoose");
const review = require("./review");
const User = require("./user");
const { string, required } = require("joi");
const Schema=mongoose.Schema;
const listingschema = new Schema({
    title:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    image: {
        url:String,
        filename:String
},

    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
       type:String
    },
    review:[{
        type:Schema.Types.ObjectId,
        ref:"review",
    },],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
//     geometry:{
//         type:{
//         type:String,
//         enum:['Point'],
//         required:true
//     },
//     coordinates:{
//         type:[Number],
//         required:true
//     }
// }
});
listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing){ await review.deleteMany({_id:{$in:listing.review}});
}
    
})
const listing=mongoose.model("listing",listingschema);
module.exports=listing;