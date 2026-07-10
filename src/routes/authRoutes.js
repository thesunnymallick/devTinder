const express = require("express");
const { singupController, loginController, logoutController } = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/singup", singupController);
authRouter.post("/login",  loginController);
authRouter.post("/logout", logoutController);

module.exports=authRouter
