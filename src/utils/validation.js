const validator = require("validator");

const singupValidation = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter your name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email id is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not valid");
  }
};



const updateProfileValidate=(req)=>{
  const {firstName, lastName, photoUrl, skills,}=req.body

  const allowedFiled=["firstName", "lastName", "age", "photoUrl", "gender", "skills", "bio"]
  const isAllowedFiled=Object.keys(req.body).every((k)=>allowedFiled.includes(k))
 
  if (!firstName || !lastName) {
    throw new Error("Enter your name");
  }
  
  else if(photoUrl && !validator.isURL(photoUrl)){
    throw new Error ("photo url is not valid")
  }

  if (skills && !Array.isArray(skills)) {
    throw new Error("Skills must be an array.");
  }

  if (skills && skills.length > 20) {
    throw new Error("You can add a maximum of 20 skills.");
  }

  return isAllowedFiled

}


module.exports={singupValidation, updateProfileValidate}