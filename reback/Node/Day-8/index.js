const { userService, postService, commentService } = require("./app");

userService.createUser(1, "Sandeep", "sandeep@gmail.com");
userService.createUser(2, "Amit", "amit@gmail.com");

postService.createPost(101, 1, "Node.js Basics", "Intro to Node");
postService.createPost(102, 1, "Memory DB", "In-memory systems");

commentService.createComment(1001, 101, 2, "Nice article!");
commentService.createComment(1002, 101, 1, "Thanks!");

console.log(postService.getPostsByUser(1));
console.log(commentService.getCommentsByPost(101));

userService.deleteUser(1); // CASCADE DELETE

console.log("After delete:", postService.getPostsByUser(1));
