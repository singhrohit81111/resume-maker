const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

const refreshAccessToken = async (incomingRefreshToken) => {
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorised token");
  }
  const decodedRefreshToken = await jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN
  );
  const user = await User.findById(decodedRefreshToken._id);
  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token");
  }
  if ((incomingRefreshToken = !user.refreshToken)) {
    throw new ApiError(401, "Refresh token is expired");
  }
  return decodedRefreshToken;
};

module.exports = { generateAccessAndRefreshToken };
