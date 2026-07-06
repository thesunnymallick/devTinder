const express = require("express");
const connectDB = require("./config/db");
const User = require("./model/user");
const app = express();

app.use(express.json());

app.post("/singup", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send("User create sucessfully");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).json({
      data: {
        user,
        message: "user featch successfully",
      },
    });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      data: {
        users,
        message: "fetch all users",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

app.post("/deleteUser", async (req, res) => {
  try {
    const users=await User.findOneAndDelete({_id: req.body.id})
    res.status(200).json("User delete successfully")
  } catch (error) {
    console.log(error);
  }
});

app.patch("/updateUser", async(req, res)=>{
    try {
      const user=await User.findByIdAndUpdate({_id: req.body.id}, req.body);
       res.status(201).json({
        data:{
          user
        }, 
        message:"user update successfully"
       })
    } catch (error) {
        console.log(error)
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
