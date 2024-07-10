const { User } = require("../models");

const generateAccessAndRefreshToken = async(userId)=>{
  const user=await User.findById(userId);
  const accessToken=await user.generateAccessToken();
  const refreshToken=await user.generateRefreshToken()
  user.refreshToken=refreshToken;
  await user.save({validateBeforeSave:false});
  return {accessToken,refreshToken};
}

module.exports = { generateAccessAndRefreshToken };
