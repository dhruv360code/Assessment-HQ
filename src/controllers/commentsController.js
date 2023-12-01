const { createCommentJoi } = require("../joi/comments.joi");
const commentsSchema = require("../models/commentsSchema");
const { insertOne, fetchAll } = require("../repository/commonRepo");
const { serverErrorResponse, successResponse } = require("../utils/response");

const createComment = async (req, res) => {
  try {
    const joiError = createCommentJoi.validate(req.body);
    if (joiError.error) {
      return serverErrorResponse(res, joiError.error.details[0].message);
    }
    const data = {
      postId: req.body.postId,
      textBody: req.body.textBody,
      userName: req.body.userName,
      userId: req.userId,
    };

    const [commentErr, commentData] = await insertOne("Comment", data);
    console.log(commentErr);
    if (!commentData || commentErr) {
      return serverErrorResponse(res, `Server Error ${commentErr.message}`);
    }
    return successResponse(res, commentData, "Comment Created Successfully!!!");
  } catch (error) {
    return serverErrorResponse(
      res,
      `Error in Creating Comment ${error.message}`
    );
  }
};

const getAllComments = async (req, res) => {
  try {
    const data = {
      postId: req.params.Id,
    };
    const [err, posts] = await fetchAll("Comment", data);
    if (err) {
      return serverErrorResponse(res, "Server Error");
    }
    return successResponse(res, posts, "Posts Fetched Successfully!!!");
  } catch (error) {
    return serverErrorResponse(res, "Error in Fetching Posts");
  }
};

module.exports = {
  createComment,
  getAllComments,
};
