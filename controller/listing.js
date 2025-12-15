const listing=require("../models/listing");




module.exports.index=async(req,res)=>
{
    const allisting=await listing.find({});
    res.render("./listings/index.ejs",{allisting});
};

module.exports.rendernewfrom=(req,res)=>{
    
    res.render("./listings/newchat.ejs");
};

module.exports.showroute=(async(req,res)=>
{
    let{id}=req.params;
    const listingid=await listing.findById(id).populate({path:"review",populate:{
        path:"author",
    },
    }).populate("owner");
    if(!listingid){
        req.flash("error","The listing you are trying to access it not valid")
      return  res.redirect("/listing");
    }
    console.log(listingid);
    res.render("listings/show.ejs",{listingid});
});

module.exports.createroute=async(req,res,next)=>
    {
// let response= await geocodingclient.forwardGeocode({
//     query:req.body.listingid.location,
//     limit:2
// })
// .send();
// console.log(response);
// res.send("done");


    let url =req.file.path;
    let filename=req.file.filename;
    console.log(url,"...",filename);
    const newlisting=new listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={url,filename};
    // newlisting.geometry=response.body.features[0].geometry;
    console.log(req.user);
    await newlisting.save();
    req.flash("success","new listing created!");
    res.redirect("/listing");
};

module.exports.editroute=async(req,res)=>
{
    let{id}=req.params;
    const listingid=await listing.findById(id);
    if(!listingid){
        req.flash("error","The listing you are trying to access it not valid")
      return  res.redirect("/listing");
    }
    let resizedImage = listingid.image.url.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs",{listingid,resizedImage});
};

module.exports.updateroute=async(req,res)=>{
    let {id}=req.params;
    let updateddata={...req.body.listing};
    
  let newlisting= await listing.findByIdAndUpdate(id,updateddata);
  if(typeof req.file !=="undefined")
  {
  let url =req.file.path;
    let filename=req.file.filename;
    newlisting.image={url,filename};
    await newlisting.save();
  }
   req.flash("success","listing updated");
   res.redirect("/listing");
};

module.exports.deleteroute=async(req,res)=>{
    let{id}=req.params;
    let deletedlist=await listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!");
    res.redirect("/listing");
};