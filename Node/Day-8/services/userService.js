const User = require("../models/User");
const { users, posts } = require("../store/memoryStore");
const { deletePost } = require("./postService");

function createUser(id, name, email) {
  if (users.has(id)) throw new Error("User already exists");
  users.set(id, new User(id, name, email));
}

function getUserById(id) {
  return users.get(id);
}

function deleteUser(id) {
  const user = users.get(id);
  if (!user) return;

  // Cascade delete posts
  for (const postId of user.posts) {
    deletePost(postId);
  }

  users.delete(id);
}

module.exports = {
  createUser,
  getUserById,
  deleteUser,
};
