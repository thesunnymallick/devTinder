const { connection } = require("mongoose");
const Connection = require("../model/connection");
const User = require("../model/user");

const GET_FIELDS = [
  "firstName",
  "lastName",
  "age",
  "bio",
  "skills",
  "gender",
  "photoUrl",
];

const sendConnectionController = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;
    const allowedFiled = ["INTERESTED", "IGNORED"];

    if (!allowedFiled.includes(status)) {
      throw new Error("status type not allowed");
    }

    if (toUserId.toString() === fromUserId.toString()) {
      throw new Error("You cannot send a connection request to yourself.");
    }

    const reqUserInfo = await User.findById(toUserId);
    if (!reqUserInfo) {
      throw new Error("User not found");
    }

    const allReadyConnection = await Connection.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });

    if (allReadyConnection) {
      throw new Error("Connection already exists.");
    }

    const connection = new Connection({
      fromUserId,
      toUserId,
      status,
    });

    const connectionInfo = await connection.save();

    const messages = {
      INTERESTED: `${req.user.firstName} Connection request sent to ${reqUserInfo.firstName} successfully.`,
      IGNORED: `${reqUserInfo.firstName} has been ignored successfully.`,
    };

    res.status(200).json({
      data: {
        code: 200,
        success: true,
        message: messages[status],
        connectionInfo,
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

const reviewConnectionController = async (req, res) => {
  try {
    const { status, requestId } = req.params;
    const toUserId = req.user.id;
    const allowedFiled = ["ACCEPTED", "REJECTED"];
    if (!allowedFiled.includes(status)) {
      throw new Error("status Type not allowed");
    }
    // find request id present or not in db
    const connectionFound = await Connection.findOne({ _id: requestId });
    console.log("coonection : ", connectionFound)
    if (!connectionFound) {
      throw new Error("connection not found");
    }



    const connection = await Connection.findOne({
      _id: requestId,
      status: "INTERESTED",
      toUserId: toUserId,
    });

    if (!connection) {
      throw new Error("connection not found");
    }

    connection.status = status;
    const data = await connection.save();
    const messages = {
      ACCEPTED: `You accepted connection request.`,
      REJECTED: `You rejected connection request.`,
    };
    res.status(200).json({
      code: 200,
      success: true,
      message: messages[status],
      data,
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

const allPendingConnectionsController = async (req, res) => {
  try {
    const toUserId = req.user.id;

    const allPendingConnection = await Connection.find({
      $or: [
        { toUserId: toUserId, status: "INTERESTED" },
        { fromUserId: toUserId, status: "INTERESTED" },
      ],
    })
      .populate("fromUserId", GET_FIELDS)
      .populate("toUserId", GET_FIELDS);

    const formattedData = allPendingConnection.map((connection) => {
      const isSent =
        connection.fromUserId._id.toString() === toUserId.toString();

      return {
        requestId: connection._id,
        status: connection.status,
        type: isSent ? "SENT" : "RECEIVED",
        user: isSent ? connection.toUserId : connection.fromUserId,
        createdAt: connection.createdAt,
      };
    });

    res.status(200).json({
      data: {
        code: 200,
        success: true,
        message: "conncetion fetch successfully",
        data: formattedData,
      },
    });
  } catch (error) {
    res.status(400).json({
      data: {
        success: false,
        code: 400,
        message: "something went wrong",
        error: error.message,
      },
    });
  }
};

const allAccpectConnectionController = async (req, res) => {
  try {
    const toUserId = req.user.id;
    const allAcceptConnection = await Connection.find({
      $or: [
        { toUserId: toUserId, status: "ACCEPTED" },
        { fromUserId: toUserId, status: "ACCEPTED" },
      ],
    }).populate("fromUserId", GET_FIELDS)
      .populate("toUserId", GET_FIELDS);

    const connections=allAcceptConnection.map((connection)=>{
      const isSender=connection.fromUserId.toString()===toUserId.toString();
       return ({
         user:isSender? connection.toUserId : connection.fromUserId,
         connectionId:connection._id,
         connectedAt:connection.updatedAt
       })
    })

    res.status(200).json({
      data: {
        code: 200,
        success: true,
        message: "conncetion fetch successfully",
        data: connections,
      },
    });
  } catch (error) {
    res.send(400).json({
      data: {
        code: 400,
        success: false,
        message: "something went wrong",
        error: error.message,
      },
    });
  }
};

module.exports = {
  sendConnectionController,
  reviewConnectionController,
  allPendingConnectionsController,
  allAccpectConnectionController
};
