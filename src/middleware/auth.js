const jwt=require("jsonwebtoken")
const User=require("../model/user");


const userAuth=async(req, res, next)=>{
    try {
        const {token}=req.cookies;

        if(!token){
            throw new Error ("token is not valid");
        }
        const decodeInfo=jwt.verify(token, "DevTinder@#2000");
    
        const user= await User.findById(decodeInfo?.id);
    
        if(!user){
            throw new Error ("User not found")
        }
        req.user=user;
        next();
    } catch (error) {
        res.status(400).json({
            error :error.message
        })
    }
}

module.exports ={userAuth}