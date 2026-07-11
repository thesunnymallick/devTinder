const mongoose=require("mongoose");

const connectionSchema=new mongoose.Schema({
    fromUserId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
     type:String,
     required:true,
     enum:{
        values:["INTERESTED", "IGNORED", "ACCEPTED", "REJECTED"],
        message:'{VALUE} is not valid status'
     }
    }
}, {timestamps:true})

const Connection=mongoose.model("Connection", connectionSchema);

module.exports=Connection