import PostCard from "./PostCard";

export default function Feed({ posts, users, onSelect }) {
  if (!posts.length) return <p>No posts found.</p>;

  return (
    <div className="feed">
      {posts.map((p, i) =>
        p.type === "separator" ? (
          <div key={`sep-${i}`} className="separator">
            User {p.userId}
          </div>
        ) : (
          <PostCard
            key={p.id}
            post={p}
            author={users.find((u) => u.id === p.userId)}
            onClick={() => onSelect(p.id)}
          />
        ),
      )}
    </div>
  );
}
