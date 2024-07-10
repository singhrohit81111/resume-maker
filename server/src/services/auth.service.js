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

const login = async(email,password) => {
    const existingUser=await User.findOne({email});
    if(!existingUser){
        throw new ApiError(409,"User not exits! please Signup");
    }
    const isPasswordMatching=await existingUser.isPasswordCorrect(password);
    if(!isPasswordMatching){
        throw new ApiError(409,"Password deonot match!")
    }
    return existingUser;
 };

const updatePassword = asyncHandler(async (req, res, next) => { });

const logout = asyncHandler(async (req, res, next) => { });

const getCurrentUser=async(userId)=>{
    const currentUser=await User.findById(userId).select("-password");
    return currentUser;
}

module.exports = { register, login, updatePassword, logout ,getCurrentUser};
