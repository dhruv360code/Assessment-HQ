const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  textBody: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

// indexing on postId
commentSchema.index({ postId: 1 });

module.exports = mongoose.model("Comment", commentSchema);
