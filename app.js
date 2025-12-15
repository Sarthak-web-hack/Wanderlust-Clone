if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const listing = require("./models/listing.js");
const methodOverride = require("method-override");
const wrapsync = require("./utils/wrapsync.js");
const expresserror = require("./utils/expresserror.js");
const { listingschema, reviewschema } = require("./schema.js");
const passport = require("passport");
const localstrategy = require("passport-local");
const User = require("./models/user.js");
const listings = require("./routes/listing.js");
const reviewrouter = require("./routes/review.js");
const userrouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const engine = require("ejs-mate");

// ---------- Middleware and App Setup ----------
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ---------- Session Config ----------
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// ---------- Database Connection ----------
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Start server only after DB connection succeeds
    app.listen(8080, () => {
      console.log("🚀 Server running on http://localhost:8080");
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

main();

// ---------- Session, Flash & Passport Setup ----------
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---------- Flash and Current User Middleware ----------
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentuser = req.user;
  next();
});

// ---------- Routes ----------
app.use("/listing", listings);
app.use("/listing", reviewrouter);
app.use("/", userrouter);

// ---------- Error Handling ----------
app.use((err, req, res, next) => {
  let { statuscode = 500, message = "Something went wrong!" } = err;
  res.status(statuscode).render("error.ejs", { message });
});




// if(process.env.NODE_ENV !="production")
// {
// require('dotenv').config();
// }
// // console.log(process.env.secret);

// const express=require("express");
// const app=express();
// const mongoose=require("mongoose");
// const path=require('path');
// const listing=require("./models/listing.js");
// const { title } = require("process");
// const methodOverride=require("method-override");
// const { url } = require("inspector");
// const wrapsync=require("./utils/wrapsync.js");
// const expresserror=require("./utils/expresserror.js");
// const { error } = require("console");
// const {listingschema,reviewschema}=require("./schema.js")
// const passport=require("passport");
// const localstrategy=require("passport-local");
// const User=require("./models/user.js");
// // const review=require("./models/review.js");
// const listings=require("./routes/listing.js");
// const reviewrouter =require("./routes/review.js");
// const userrouter=require("./routes/user.js");
// const session=require("express-session");

// const flash=require("connect-flash");
// const user = require("./models/user.js");

// //  ejsmate=require('ejs-mate');
// // app.ejsmate('ejs',ejsmate);
// engine = require('ejs-mate')
//   app.engine('ejs', engine);

// app.use(methodOverride("_method"));
// app.use(express.urlencoded({extended:true}));
// app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views"));
// app.use(express.static(path.join(__dirname,"/public")));

// const sessionOptions={
//   secret:"mysupersecretcode",
//   resave:false,
//   saveUninitialized: true,
//   cookie:{
//     expires:Date.now() + 7*24*60*60*1000,
//     maxAge: 7*24*60*60*1000,
//     httpOnly:true,
//   },
// }




// main().then(()=>{
// console.log("connected to DB")})
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
 
// }


// app.use(session(sessionOptions));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session()); 
// passport.use(new localstrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// app.use((req,res,next)=>{
//   res.locals.success=req.flash("success");
//   res.locals.error=req.flash("error");
//   res.locals.currentuser=req.user;
// //  console.log(res.locals.success);
//   next();
// });

// app.use("/listing",listings);
// app.use("/listing",reviewrouter); 
// app.use("/",userrouter);




// //demo usera
// // app.get("/demouser",async(req,res)=>
// // {
// //   let fakeuser=new User({
// //   email:"pushkrajjagatap@gmail.com",
// //   username : "delta-student"
// // });
// // let registereduser=await User.register(fakeuser,"hello");//hello=password 
// // res.send(registereduser);
// // });

// // app.post("/listingnew",wrapsync(async(req,res,next)=>{
// //     let  result=  listingschema.validate(req.body);
// //     console.log(result);
// //     const newlisting=new listing(req.body.listing);
// //    if(result.error){
// //     throw new expresserror(400,result.error);
// //    }
    
// //     await newlisting.save();
// //     res.redirect("/listing");
// //     })
// // );



// //chatgpt update route




// //test listing
// // app.get("/testlisting", async(req,res)=>{
// //     let samplelisting =new listing({
// //         title:"My new villa",
// //         description:"by the island",
// //         price:1200,
// //         location:"andahn",
// //         country:"india", 
// //     });
// //     await samplelisting.save();
// //     console.log("sample saved");
// //     res.send("successful testing");
// // });


// app.use((err,req,res,next)=>{
//     let{statuscode ,message}=err;
//     res.status(statuscode=500).render("error.ejs",{message});
//     // res.render("error.ejs",{msg});
// });



// app.listen(8080,()=>
// {
//     console.log("working on http://localhost:8080");
// });