const mongoose=require("mongoose");
const URL ='mongodb+srv://devTinder:N1IRmKaRHkbdnmE3@cluster0.pqhqbce.mongodb.net/devTinder'
const connectDB=async()=>{
   await mongoose.connect(URL)
}
module.exports=connectDB