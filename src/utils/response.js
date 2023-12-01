const successResponse = (res, data, message = "Successful") => {
  return res.status(200).json({
    code: 200,
    data: data,
    message: message,
  });
};

const serverErrorResponse = (res, message) => {
  return res.status(500).json({
    code: 500,
    message: message,
  });
};

const errorResponse = (res, code, message, data = null) => {
  return res.status(code).json(logObj);
};

const badRequestResponse = (res, message) => {
  return res.status(400).json({
    code: 400,
    message: message,
  });
};

const unauthorizedResponse = (res, message) => {
  return res.status(401).json({
    code: 401,
    message: message,
  });
};

const forbiddenResponse = (res, message) => {
  return res.status(403).json({
    code: 403,
    message: message,
  });
};

const notFoundResponse = (res, message) => {
  console.log(logObj);
  return res.status(404).json({
    code: 404,
    message: message,
  });
};

const createError = (code, message) => {
  return {
    code: code,
    message: message,
  };
};

module.exports = {
  errorResponse,
  successResponse,
  serverErrorResponse,
  badRequestResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  createError,
};
