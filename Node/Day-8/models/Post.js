class Post {
  constructor(id, userId, title, content) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.comments = new Set();
  }
}

module.exports = Post;
