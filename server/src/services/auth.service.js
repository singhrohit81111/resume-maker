const asyncHandler = require("../utils/asyncHandler");
const { User } = require('../models');
const ApiError = require("../utils/ApiError");

const register = async (firstName, lastName, email, password) => {
    console.log(firstName, ">>>>>", lastName, ">>>", email, ">>>>", password);
    if ([firstName, lastName, email, password].some(field => !field.trim())) {
        throw new ApiError(401, "All fields are required")
    }
    const currentUser=await User.findOne({email});
    if(currentUser){
        throw new ApiError(401,"User already exists");
    }
    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    })
    return user;
}

const login = asyncHandler(async (req, res, next) => { });

const updatePassword = asyncHandler(async (req, res, next) => { });

const logout = asyncHandler(async (req, res, next) => { });

module.exports = { register, login, updatePassword, logout };
