const router = require("express").Router();

const { updateUser, fetchUserById } = require("../controllers/userController");
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

router.put("/updateUser", userValidate, updateUser);
router.get("/getUser", userValidate, fetchUserById);

router.post("/createPost", userValidate, createPost);
router.get("/retrieveAllPostOfUsers", userValidate, retrieveAllPostOfUsers);
router.get("/retrievePostById", userValidate, retrievePostById);

router.post("/createComment", userValidate, createComment);
router.get("/getAllComments/:Id", userValidate, getAllComments);

module.exports = router;
