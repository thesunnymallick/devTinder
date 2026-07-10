

const viewProfileController=async(req, res)=>{
  try {
    const user=req.user;
    if(!user){
      throw new Error ("User not found");
    }
    res.status(200).json({
      data: {
        code:200,
        success:true,
        message: "user featch successfully",
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
        data:{
            code:400,
            success:false,
            message:"something went wrong",
            error:error.message
        }
    })
  }
}

module.exports={viewProfileController}