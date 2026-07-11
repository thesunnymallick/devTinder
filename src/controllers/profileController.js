const User = require("../model/user");
const { updateProfileValidate } = require("../utils/validation");

const viewProfileController = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({
      data: {
        code: 200,
        success: true,
        message: "user featch successfully",
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      data: {
        code: 400,
        success: false,
        message: "something went wrong",
        error: error.message,
      },
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    if (!updateProfileValidate(req)) {
      throw new Error("profile update validations failed");
    }
    const { firstName, lastName, photoUrl, skills, bio, age, gender } =
      req.body;

    const updateUser = await User.findByIdAndUpdate(
      { _id: req.user?.id },
      {
        firstName,
        lastName,
        photoUrl,
        skills,
        bio,
        age,
        gender,
      
      },
      {runValidators: true, returnDocument: 'after'}
    );

    res.status(200).json({
      data: {
        code: 200,
        success: true,
        message: "profile update successfuly",
        user:updateUser
      },
    });
  } catch (error) {
    res.status(400).json({
      data: {
        code: 400,
        success: false,
        message: "something went wrong",
        error: error.message,
      },
    });
  }
};

module.exports = { viewProfileController, updateProfileController };
