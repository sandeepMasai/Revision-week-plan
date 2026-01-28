import { useEffect, useState } from "react";
import { fetchPostDetail } from "../api";

export default function PostDetail({ postId, onClose }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchPostDetail(postId).then(setData);
  }, [postId]);

  if (!data) return <div className="modal">Loading...</div>;

  return (
    <div className="modal">
      <button onClick={onClose}>✖</button>
      <h2>{data.post.title}</h2>
      <p>{data.post.body}</p>

      <h3>Comments</h3>
      {data.comments.map((c) => (
        <p key={c.id}> {c.body}</p>
      ))}
    </div>
  );
}
