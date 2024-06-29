const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res, next) => {});

const login = asyncHandler(async (req, res, next) => {});

const updatePassword = asyncHandler(async (req, res, next) => {});

const logout = asyncHandler(async (req, res, next) => {});

module.exports = { register, login, updatePassword, logout };
