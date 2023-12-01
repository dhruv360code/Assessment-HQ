const router = require("express").Router();

const {
  updateUser,
  fetchUserById,
  logout,
} = require("../controllers/userController");
const {
  createPost,
  retrieveAllPostOfUsers,
  retrievePostById,
} = require("../controllers/postController");
const {
  createComment,
  getAllComments,
} = require("../controllers/commentsController");
const { userValidate } = require("../middlewares/validation");

router.post("/updateUser", userValidate, updateUser);
router.get("/getUser", userValidate, fetchUserById);
router.get("/logout", userValidate, logout);

router.post("/createPost", userValidate, createPost);
router.post("/retrieveAllPostOfUser", userValidate, retrieveAllPostOfUsers);
router.get("/retrievePostById/Id", userValidate, retrievePostById);

router.post("/createComment", userValidate, createComment);
router.post("/getAllComments", userValidate, getAllComments);

module.exports = router;