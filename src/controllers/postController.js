const { createPostJoi } = require("../joi/post.joi");
const Post = require("../models/postSchema");
const { insertOne, fetchAll, fetchOne } = require("../repository/commonRepo");
const { serverErrorResponse, successResponse } = require("../utils/response");

const createPost = async (req, res) => {
  try {
    const joiError = createPostJoi.validate(req.body);
    if (joiError.error) {
      return serverErrorResponse(res, joiError.error.details[0].message);
    }
    const data = {
      title: req.body.title,
      description: req.body.description,
      userId: req.userId,
    };
    const [postErr, postData] = await insertOne("Post", data);
    console.log(postErr);
    if (!postData || postErr) {
      return serverErrorResponse(res, "Server Error");
    }
    return successResponse(res, postData, "Post Created Successfully!!!");
  } catch (error) {
    return serverErrorResponse(res, "Error in Creating Post");
  }
};

const retrieveAllPostOfUsers = async (req, res) => {
  try {
    let data = {};
    const [err, posts] = await fetchAll("Post", data);
    if (err) {
      return serverErrorResponse(res, "Server Error");
    }
    return successResponse(res, posts, "Posts Fetched Successfully!!!");
  } catch (error) {
    return serverErrorResponse(res, `Error in Fetching Posts ${error.message}`);
  }
};
const retrievePostById = async (req, res) => {
  try {
    const data = {
      postId: req.params.Id,
    };
    const [err, posts] = await fetchOne("Post", data);
    if (err) {
      return serverErrorResponse(res, "Server Error");
    }
    return successResponse(res, posts, "Posts Fetched Successfully!!!");
  } catch (error) {
    return serverErrorResponse(res, "Error in Fetching Posts");
  }
};

module.exports = {
  createPost,
  retrieveAllPostOfUsers,
  retrievePostById,
};
