const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const User = require("./model/user");
const { singupValidation } = require("./utils/validation");
const app = express();

app.use(express.json());

app.post("/singup", async (req, res) => {
  try {
    singupValidation(req);
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).send("User create sucessfully");
  } catch (error) {
    res.status(500).json({
      message: "opps! something went wrong",
      error: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId | !password) {
      throw new Error("Email id and password is required");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invaild credentials");
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      throw new Error("Invaild credentials");
    }
    res.status(200).json({
      message: "login successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "something went wrong",
    });
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
    const users = await User.findOneAndDelete({ _id: req.body.id });
    res.status(200).json("User delete successfully");
  } catch (error) {
    console.log(error);
  }
});

app.patch("/updateUser/:id", async (req, res) => {
  try {
    const allowedFiled = [
      "firstName",
      "lastName",
      "age",
      "photoUrl",
      "gender",
      "skils",
      "bio",
    ];
    const isAllowed = Object.keys(req.body).every((e) =>
      allowedFiled.includes(e)
    );
    if (!isAllowed) {
      throw new Error("upadate failed");
    }

    await User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(201).json({
      message: "user update successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: `update failed : ${error.message}`,
    });
  }
});

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
