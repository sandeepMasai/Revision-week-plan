const Comment = require("../models/Comment");
const { users, posts, comments } = require("../store/memoryStore");

function createComment(id, postId, userId, text) {
  if (!posts.has(postId)) throw new Error("Post not found");
  if (!users.has(userId)) throw new Error("User not found");

  const comment = new Comment(id, postId, userId, text);
  comments.set(id, comment);
  posts.get(postId).comments.add(id);
}

function getCommentsByPost(postId) {
  const post = posts.get(postId);
  if (!post) return [];

  return [...post.comments].map((cid) => comments.get(cid));
}

module.exports = {
  createComment,
  getCommentsByPost,
};
