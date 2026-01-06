async function fetchUserPostComments() {
  try {
    // 1️ Fetch User
    const userRes = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await userRes.json();

    // 2️Fetch Posts user id
    const postsRes = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
    );
    const posts = await postsRes.json();
    const firstPost = posts[0];

    //  check
    if (!firstPost) {
      throw new Error("User has no posts");
    }

    // 3️ Fetch Comments post id
    const commentsRes = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${firstPost.id}`
    );
    const comments = await commentsRes.json();

    // 4️ Final  output
    const result = {
      userName: user.name,
      firstPostTitle: firstPost.title,
      commentCount: comments.length,
      topComment: comments[0]?.body || "",
    };

    console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Call function
fetchUserPostComments();
