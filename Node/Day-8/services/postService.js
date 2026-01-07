const Post = require("../models/Post");
const { users, posts, comments } = require("../store/memoryStore");

function createPost(id, userId, title, content) {
  const user = users.get(userId);
  if (!user) throw new Error("User not found");

  const post = new Post(id, userId, title, content);
  posts.set(id, post);
  user.posts.add(id);
}

function getPostsByUser(userId) {
  const user = users.get(userId);
  if (!user) return [];

  return [...user.posts].map((pid) => posts.get(pid));
}

function deletePost(postId) {
  const post = posts.get(postId);
  if (!post) return;

  // Cascade delete comments
  for (const commentId of post.comments) {
    comments.delete(commentId);
  }

  users.get(post.userId)?.posts.delete(postId);
  posts.delete(postId);
}

module.exports = {
  createPost,
  getPostsByUser,
  deletePost,
};
