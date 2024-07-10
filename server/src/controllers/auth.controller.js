const asyncHandler = require("../utils/asyncHandler");
const { authService, tokenService } = require('../services');
const { OPTIONS } = require("../config/constants");

const register = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    console.log(req,">>>>>req");
    const createdUser=await authService.register(firstName, lastName, email, password);
    console.log(createdUser,">>>cu");
    const { accessToken, refreshToken } = await tokenService.generateAccessAndRefreshToken(createdUser._id);

    res.status(200).cookie("accesToken", accessToken, OPTIONS).cookie("refreshToken", refreshToken, OPTIONS).json("user created successfully")

});

const login = asyncHandler(async (req, res, next) => { });

const updatePassword = asyncHandler(async (req, res, next) => { });

const logout = asyncHandler(async (req, res, next) => { });

module.exports = { register, login, updatePassword, logout };
