export default function PostCard({ post, author, onClick }) {
  return (
    <div
      className={`post ${post.highlighted ? "highlight" : ""}`}
      onClick={onClick}
    >
      <h3>{post.title}</h3>
      <p>{post.body.slice(0, 100)}...</p>
      <small> {author?.name || "Unknown"}</small>
    </div>
  );
}
