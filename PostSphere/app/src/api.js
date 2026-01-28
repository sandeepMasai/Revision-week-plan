const BASE = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async (page, limit) => {
  const res = await fetch(`${BASE}/posts?_page=${page}&_limit=${limit}`);
  if (!res.ok) throw new Error("Failed to load posts");
  return res.json();
};

export const fetchUsers = async () =>
  fetch(`${BASE}/users`).then((r) => r.json());

export const fetchComments = async () =>
  fetch(`${BASE}/comments`).then((r) => r.json());

export const fetchPostDetail = async (postId) => {
  const [post, comments] = await Promise.all([
    fetch(`${BASE}/posts/${postId}`).then((r) => r.json()),
    fetch(`${BASE}/posts/${postId}/comments`).then((r) => r.json()),
  ]);
  return { post, comments };
};
