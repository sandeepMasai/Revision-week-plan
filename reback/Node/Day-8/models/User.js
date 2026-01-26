class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.posts = new Set();
  }
}

module.exports = User;
