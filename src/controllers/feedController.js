const Connection = require("../model/connection");
const User = require("../model/user");

const feedController = async (req, res) => {
  try {
    const loginUserId = req.user.id;

    const allReadyConnection = await Connection.find({
      $or: [{ fromUserId: loginUserId }, { toUserId: loginUserId }],
    }).select(["fromUserId", "toUserId"]);

    const hideUsers = new Set();
    hideUsers.add(loginUserId.toString());
    allReadyConnection.forEach((item) => {
      hideUsers.add(item.fromUserId.toString());
      hideUsers.add(item.toUserId.toString());
    });


    const users = await User.find({
        _id: {
          $nin: [...hideUsers],
        },
      });

    res.status(200).json({
      data: {
        code: 200,
        success: true,
        message: "all data fetch sucessfully",
        users,
      },
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      success: false,
      message: "something went wrong",
      error: error.message,
    });
  }
};

module.exports = feedController;
