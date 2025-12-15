const mongoose=require("mongoose");
const path=require('path');
const initdata=require("./data.js")
const Listing=require("../models/listing.js");
main().then(()=>{
console.log("connected to DB")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
const initdb=async()=>{
    await Listing.deleteMany({}); 
    initdata.data= initdata.data.map((obj)=>({...obj,owner:"68d0f15e23e3ee4ca2029ea4"}));
    await Listing.insertMany(initdata.data);
    console.log("data was inserted successfully");
} 
initdb();
