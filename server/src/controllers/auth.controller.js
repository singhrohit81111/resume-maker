import { generateAccessAndRefreshToken } from "../services/token.service";

const asyncHandler = require("../utils/asyncHandler");
const { authService, tokenService } = require("../services");
const { OPTIONS } = require("../config/constants");

const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const createdUser = await authService.register(
    firstName,
    lastName,
    email,
    password
  );

  const { accessToken, refreshToken } =
    await tokenService.generateAccessAndRefreshToken(createdUser._id);

  res
    .status(200)
    .cookie("accesToken", accessToken, OPTIONS)
    .cookie("refreshToken", refreshToken, OPTIONS)
    .json("user created successfully");
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);

  const { accessToken, refreshToken } =
    await tokenService.generateAccessAndRefreshToken(user._id);
  const currentUser = await authService.getCurrentUser(user._id);

  res
    .status(200)
    .cookie("accessToken", accessToken, OPTIONS)
    .cookie("refreshToken", refreshToken, OPTIONS)
    .json(currentUser);
});

const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  await authService.updatePassword(oldPassword, newPassword, req.user);
  res.status(200).json("Password updated succeessfully");
});

const logout = asyncHandler(async (req, res, next) => {
  await authService.logout(req.user._id);

  res
    .status(200)
    .clearCookie("accessToken", OPTIONS)
    .clearCookie("refreshToken", OPTIONS)
    .json("logout successfully");
});

export const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const incomingRefreshToken =
    req.cookies.refreshToken ||
    req.header("Authorization").replace("Bearer", "");

  const decodedRefreshToken = await tokenService.refreshAccessToken(
    incomingRefreshToken
  );

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    decodedRefreshToken._id
  );

  res
    .status(200)
    .cookie("accessToken", accessToken, OPTIONS)
    .cookie("refreshToken", refreshToken, OPTIONS)
    .json("Access token refreshed");
});
module.exports = { register, login, updatePassword, logout };
