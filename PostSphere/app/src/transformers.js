export const applyTransformers = (posts, transformers) =>
  transformers.reduce((acc, fn) => fn(acc), posts);

export const highlightLongPosts = (min) => (posts) =>
  posts.map((p) => ({
    ...p,
    highlighted: p.body.length > min,
  }));

export const hideUsers = (userIds) => (posts) =>
  posts.filter((p) => !userIds.includes(p.userId));

export const groupByUser = () => (posts) => {
  const result = [];
  let lastUser = null;

  posts.forEach((p) => {
    if (p.userId !== lastUser) {
      result.push({ type: "separator", userId: p.userId });
      lastUser = p.userId;
    }
    result.push(p);
  });

  return result;
};

export const sortByCommentCount = (commentMap) => (posts) =>
  [...posts].sort(
    (a, b) => (commentMap[b.id]?.length || 0) - (commentMap[a.id]?.length || 0),
  );
