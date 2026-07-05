const express = require("express");
const connectDB = require("./config/db");
const User=require("./model/user")
const app = express();

  app.get("/", (req, res)=>{
    res.send("hello")
  })

app.post("/singup", async(req, res)=>{
   try {
    const user={
        firstName:"Sunny",
        lastName:"Mallick",
        password:"Sunny@123",
        age:24,
    }
   
    const newUser=new User(user);
    await newUser.save();

    res.status(200).send("User create sucessfully")

   } catch (error) {
     res.status(500).send("Something went wrong")
   }
})

connectDB()
  .then(() => {
    console.log("database connection successfully");
    app.listen(8000, () => {
      console.log(`Server starting port ${8000}`);
    });
  })
  .catch((err) => {
    console.log("database connection failed!");
  });
