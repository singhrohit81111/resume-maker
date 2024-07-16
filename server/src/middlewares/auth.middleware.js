const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const verifyJwt = asyncHandler(async (req, res, next) => {
    const incomingAccessToken = req?.cookies?.refreshToken || req.header('Authorizatoin').replace("Bearer", "");

    if (!icomingRefreshToken) {
        throw new ApiError(401, "Unauthorised token!")
    }
    const decodedToken = await jwt.verify(incomingAccessToken, process.env.ACCESS_TOKEN);
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(401, "User doesnot exists")
    }
    req.user = user;
    next();
});

module.exports = verifyJwt;
