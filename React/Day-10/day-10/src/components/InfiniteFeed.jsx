import { useState } from "react";

const allPosts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  author: `Author ${(i % 10) + 1}`,
  content: `This is post number ${i + 1}`,
  likes: Math.floor(Math.random() * 500),
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
}));

const PAGE_SIZE = 20;

export default function InfiniteFeed() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);

  const visiblePosts = allPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allPosts.length;

  const loadMore = () => {
    if (!hasMore) return;

    setLoading(true);

    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, allPosts.length));
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>Social Media Feed</h2>

      {visiblePosts.map((post) => (
        <div
          key={post.id}
          style={{
            border: "1px solid #ddd",
            padding: 12,
            marginBottom: 10,
            borderRadius: 6,
          }}
        >
          <strong>{post.author}</strong>
          <p>{post.content}</p>
          <small>
            {post.likes} · {new Date(post.timestamp).toLocaleString()}
          </small>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: 20 }}>
        {loading && <p>Loading...</p>}

        {!loading && hasMore && <button onClick={loadMore}>Load More</button>}

        {!hasMore && <p style={{ color: "gray" }}>No more posts</p>}
      </div>
    </div>
  );
}
