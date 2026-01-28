import {
  highlightLongPosts,
  groupByUser,
  sortByCommentCount,
} from "../transformers";

export default function TransformersPanel({ setTransformers, commentMap }) {
  const toggle = (fn) =>
    setTransformers((prev) =>
      prev.includes(fn) ? prev.filter((f) => f !== fn) : [...prev, fn],
    );

  return (
    <div className="panel">
      <button onClick={() => toggle(highlightLongPosts(120))}>
        Highlight long posts
      </button>
      <button onClick={() => toggle(groupByUser())}>Group by user</button>
      <button onClick={() => toggle(sortByCommentCount(commentMap))}>
        Sort by comments
      </button>
    </div>
  );
}
