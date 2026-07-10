const express=require("express");
const { viewProfileController } = require("../controllers/profileController");
const {userAuth} =require("../middleware/auth")

const profileRoute=express.Router();

profileRoute.get("/view",  userAuth, viewProfileController)


module.exports=profileRoute