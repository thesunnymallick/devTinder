const User = require("../model/user");
const { singupValidation } = require("../utils/validation");
const bcrypt = require("bcrypt");

const singupController = async (req, res) => {
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
    res.status(200).json({
      data: {
        code: 200,
        success: true,
        message: "user create successfully",
      },
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      success: false,
      message: "opps! something went wrong",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId | !password) {
      throw new Error("email id and password is required");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invaild credentials");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invaild credentials");
    }
    const token = user.getJwt();
    res.cookie("token", token);
    res.status(200).json({
      data: {
        code: 200,
        success: true,
        message: "login successfully",
      },
    });
  } catch (error) {
    res.status(400).json({
      data: {
        success: false,
        code: 400,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("token", {});
    res.status(200).json({
      success: true,
      code: 200,
      message: "logout successfully",
    });
  } catch (error) {
    res.status(400).json({
      data: {
        code: 400,
        success: false,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const newPassword = req.body.password;
    const userId = req.user._id;
    if (!userId) {
      throw new Error("user not found");
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(
      userId,
      {
        password: hashPassword,
      },
      { runValidators: true }
    );
    res.status(200).json({
      data: {
        success: true,
        code: 200,
        message: "new password update successfully",
      },
    });
  } catch (error) {
    res.status(400).json({
      data: {
        success: false,
        code: 400,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
};

module.exports = {
  singupController,
  loginController,
  logoutController,
  forgotPasswordController,
};
