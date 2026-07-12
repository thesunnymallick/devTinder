const express=require("express");
const {userAuth}=require("../middleware/auth");
const { sendConnectionController, reviewConnectionController, allPendingConnectionsController, allAccpectConnectionController } = require("../controllers/connectionController");
const connectionRoute=express.Router();


connectionRoute.post("/send/:status/:userId", userAuth, sendConnectionController)
connectionRoute.post("/review/:status/:requestId", userAuth, reviewConnectionController);
connectionRoute.get("/requests/pending", userAuth, allPendingConnectionsController)
connectionRoute.get("/connections", userAuth,  allAccpectConnectionController)



module.exports=connectionRoute