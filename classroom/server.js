const express=require("express");
const app=express();
const cookieparser=require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");
const path=require('path');
const { name } = require("ejs");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const sessionOptions={
    secret:"mysuperseceretstring",
    resave:false,
    saveUninitialized:true,
};

app.use(session(sessionOptions));
app.use(flash());


app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
   req.session.name=name;
   if(name==="anonymous")
   {
    req.flash("error","user not registered");
   }
   else
   {
     req.flash("success","user registered successfully");
   }
  
    res.redirect("/hello");
});


app.get("/hello",(req,res)=>{
    res.locals.sucessmessages=req.flash("success");
     res.locals.errormessages=req.flash("error");
    res.render("page.ejs",{name:req.session.name});
});
// app.use(session({secret:"mysupersecretstring",resave:false,saveUninitialized:true}));

// app.get("/test",(req,res)=>{
    
//     res.send("test successfuull");
// });
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count=1;
//     }
    
//     res.send(`you sent a request ${req.session.count} times`);
// });

//  app.use(cookieparser("secretcode"));


// app.get("/getcookies",(req,res)=>{
//     res.cookie("hii","ram ram");
//     // res.cookie("madeIN","india");
//     res.send("sent you some cookies");
    
// });
// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hii , I am root");
// });

// app.get("/greet",(req,res)=>{
//     let {name="anonoyms"}=req.cookies;
//     res.send(`Hi,${name}`);
// })


// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookie sent");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.cookies);
//     res.send("verified");
// })
app.listen(9090,()=>{
    
    console.log("server is working");
});