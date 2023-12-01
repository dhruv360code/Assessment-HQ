require("dotenv").config({ path: "./.env" });
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const { userRegisterJoi, userLoginJoi } = require("../joi/user.joi");
const {
  successResponse,
  serverErrorResponse,
  badRequestResponse,
} = require("../utils/response");
const { update, fetchOne } = require("../repository/commonRepo");
const { registerUserRepo } = require("../repository/userRepo");

const registerUser = async (req, res) => {
  try {
    const { password } = req.body;
    const joiError = userRegisterJoi.validate(req.body);
    if (joiError.error) {
      return serverErrorResponse(res, joiError.error.details[0].message);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const reqBody = {
      ...req.body,
      password: hashedPassword,
    };

    const [userError, userData] = await registerUserRepo(reqBody);
    if (userError) {
      return serverErrorResponse(res, "Server Error");
    }

    // encrypt userid into jwt token
    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET);
    const data = {
      token,
      user: userData,
    };

    return successResponse(res, data, "User Registered Successfully!!!");
  } catch (error) {
    return serverErrorResponse(res, error, "Error in creating user");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const joiError = userLoginJoi.validate(req.body);
    if (joiError.error) {
      return serverErrorResponse(res, joiError.error.details[0].message);
    }
    const user = await fetchOne("User", { email: email }, (err, user) => {
      if (err) {
        return serverErrorResponse(res, err, "Server Error");
      }
      if (!user || user.length == 0) {
        return badRequestResponse(res, "User Not Found");
      }
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return badRequestResponse(res, "Invalid Credentials");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return successResponse(res, { token: token }, "User Login Successfull");
  } catch (error) {
    return serverErrorResponse(res, "Error in Login User");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
