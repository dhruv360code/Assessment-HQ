const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });
const { unauthorizedResponse } = require("../utils/response");

const userValidate = async (req, res, next) => {
  // Get the JWT token from the request headers or query parameters
  const token = req.headers.authorization || req.query.token;
  console.log("token:", token);
  if (!token) {
    return unauthorizedResponse(res, "Unauthorized Access");
  }

  try {
    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    // Extract the userId from the decoded token
    const userId = decodedToken.id;

    // Attach the userId to the request object for further use
    req.userId = userId;
    console.log(req.userId);
    // Call the next middleware or route handler
    next();
  } catch (error) {
    return unauthorizedResponse(res, "Unauthorized Access");
  }
};

module.exports = { userValidate };
