const mongoose=require("mongoose");
const validator=require('validator');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: [true, "first Name is required"],
        minLength:1,
        maxLength:50,
        trim:true,
    },
    lastName:{
        type:String,
        minLength:1,
        maxLength:50,
        trim:true,
    },
    emailId:{
      type:String,
      required:[true, "emailId is required"],
      trim:true,
      unique:true,
      lowercase: true,
      validate:(value)=>{
        if(!validator.isEmail(value)){
            throw new Error("Email is not valid")
        }
      }

    },
    password:{
        type:String,
        required: [true, "password is required"]
    },
    age:{
        type:Number,
         min:18,
    },
    photoUrl:{
        type:String,
    },
    gender:{
        type:String,
        enum:{
            values : ["MALE", "FEMALE", "OTHER"],
            message: `{VALUE} is not valid gender. please choose MALE, FEMALE, or OTHER`
        }
    },
    skils:{
      type: [String]
    },
    bio:{
     type:String,
    }

}, {timestamps:true})

const User=mongoose.model("Users",userSchema)

module.exports=User;