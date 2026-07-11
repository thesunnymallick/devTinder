const express=require("express");
const { viewProfileController, updateProfileController } = require("../controllers/profileController");
const {userAuth} =require("../middleware/auth")

const profileRoute=express.Router();

profileRoute.get("/view",  userAuth, viewProfileController);
profileRoute.patch("/edit", userAuth, updateProfileController)


module.exports=profileRoute