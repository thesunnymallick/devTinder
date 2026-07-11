const express = require("express");
const { singupController, loginController, logoutController, forgotPasswordController } = require("../controllers/authController");
const { userAuth } = require("../middleware/auth");
const authRouter = express.Router();

authRouter.post("/singup", singupController);
authRouter.post("/login",  loginController);
authRouter.post("/logout", userAuth, logoutController);
authRouter.patch("/forgotPassword", userAuth, forgotPasswordController)

module.exports=authRouter
