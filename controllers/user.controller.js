const asyncWrapper = require("../middleware/asyncWrapper.middleware");
const User = require("../models/user.models");
const { BOOL_FALSE, BOOL_TRUE, CODE_200, CODE_201, CODE_404, EMAIL_AND_PWD_BOTH, INVLD_CRED, LOG_IN, LOGOUT_SUCCESSFULLY, USER_CRT, CODE_500, LOGOUT_FAILED, CODE_400, CODE_403 } = require("../utils/translations");
const ApiError = require("../errors/ApiError");
const ApiResponse = require("../errors/ApiResponseCode");
const dotenv = require('dotenv');
dotenv.config();

// Register
const register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body })

  const token = user.createJWT();
  const regUser = { user: { name: user.name, email: user.email }, token };
  res.status(CODE_201).json(new ApiResponse(CODE_201, regUser, USER_CRT, BOOL_TRUE))
})

// Login
const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(CODE_404).json(new ApiError(EMAIL_AND_PWD_BOTH, CODE_404, BOOL_FALSE))
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(CODE_404).json(new ApiError(INVLD_CRED, CODE_404, BOOL_FALSE));
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(CODE_404).json(new ApiError(INVLD_CRED, CODE_404, BOOL_FALSE));
  }

  const token = user.createJWT();

  const newUser = { user: { userId: user._id, name: user.name }, token };

  res.status(CODE_201).json(new ApiResponse(CODE_201, newUser, LOG_IN, BOOL_TRUE));
});

// Logout
const logout = asyncWrapper(async (req, res) => {
  res.clearCookie("token").status(CODE_200).json(new ApiResponse(CODE_200, {}, LOGOUT_SUCCESSFULLY, BOOL_TRUE));
});

module.exports = {
  register, login, logout
}