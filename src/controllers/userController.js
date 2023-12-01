const mongoose = require("mongoose");
const User = require("../models/userSchema");
const {
  serverErrorResponse,
  successResponse,
  badRequestResponse,
} = require("../utils/response");
const { update, fetchOne } = require("../repository/commonRepo");
const { userUpdateJoi } = require("../joi/user.joi");

const updateUser = async (req, res) => {
  try {
    const joiError = userUpdateJoi.validate(req.body);
    if (joiError.error) {
      return serverErrorResponse(res, joiError.error.details[0].message);
    }
    const data = {
      find: { _id: new mongoose.Types.ObjectId(req.userId) },
      update: req.body,
    };
    const [userErr, user] = await update("User", data);
    if (!user || userErr) {
      return serverErrorResponse(res, "Server Error");
    }
    return successResponse(res, user, "User Updated Successfully!!!");
  } catch (error) {
    return serverErrorResponse(res, "Error in Updating User");
  }
};

const fetchUserById = async (req, res) => {
  try {
    const [userErr, userData] = await fetchOne("User", {
      _id: new mongoose.Types.ObjectId(req.userId),
    });
    if (userErr) {
      return serverErrorResponse(res, "Server Error");
    }
    if (!userData || userData.length == 0) {
      return badRequestResponse(res, "User Not Found");
    }
    return successResponse(res, userData, "User Fetched Successfully!!!");
  } catch (error) {
    console.log(error);
    return serverErrorResponse(res, "Error In Fetching User By Id");
  }
};

module.exports = {
  updateUser,
  fetchUserById,
};
