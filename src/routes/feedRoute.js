const express = require("express");
const { userAuth } = require("../middleware/auth");
const feedController = require("../controllers/feedController");
const feedRoute=express.Router();

feedRoute.get("/",userAuth, feedController)


module.exports=feedRoute;