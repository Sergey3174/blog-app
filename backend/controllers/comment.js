const Comment = require("../models/Comment");
const Post = require("../models/Post");

// add

async function addComment(postId, comment) {
  const newComment = await Comment.create(comment);
  await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } });

  await newComment.populate("author");

  return newComment;
}

//delete
async function deleteComment(postId, commentId) {
  await Comment.deleteOne({ _id: commentId });
  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
}

async function deleteUserComments(userId) {
  const userComments = await Comment.find({ author: userId }).select("_id");
  const commentIds = userComments.map((comment) => comment._id);

  await Comment.deleteMany({ _id: { $in: commentIds } });

  await Post.updateMany(
    { comments: { $in: commentIds } },
    { $pull: { comments: { $in: commentIds } } }
  );
}

module.exports = {
  addComment,
  deleteComment,
  deleteUserComments,
};
