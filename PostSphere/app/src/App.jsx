import { useEffect, useState } from "react";
import { fetchPosts, fetchUsers, fetchComments } from "./api";

import { useDebounce } from "./hooks/useDebounce";
import { applyTransformers } from "./transformers.js";

import Feed from "./components/Feed";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import TransformersPanel from "./components/TransformersPanel";
import PostDetail from "./components/PostDetail";

const PAGE_SIZE = 10;

const fuzzyMatch = (text, query) => {
  let t = text.toLowerCase();
  let q = query.toLowerCase();
  let i = 0;
  for (let char of t) {
    if (char === q[i]) i++;
    if (i === q.length) return true;
  }
  return false;
};

export default function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("full");
  const debouncedSearch = useDebounce(search, 300);

  const [transformers, setTransformers] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts(page, PAGE_SIZE).then(setPosts);
  }, [page]);

  useEffect(() => {
    fetchUsers().then(setUsers);
    fetchComments().then(setComments);
  }, []);

  const commentMap = comments.reduce((acc, c) => {
    acc[c.postId] = acc[c.postId] || [];
    acc[c.postId].push(c);
    return acc;
  }, {});

  const filteredPosts = posts.filter((p) => {
    if (!debouncedSearch) return true;

    const author = users.find((u) => u.id === p.userId)?.name || "";
    const haystack =
      mode === "title" ? p.title : `${p.title} ${p.body} ${author}`;

    if (mode === "fuzzy") {
      return fuzzyMatch(haystack, debouncedSearch);
    }

    return haystack.toLowerCase().includes(debouncedSearch.toLowerCase());
  });

  const finalPosts = applyTransformers(filteredPosts, transformers);

  return (
    <div className="app">
      <h1> PostSphere</h1>

      <SearchBar
        value={search}
        onChange={setSearch}
        mode={mode}
        setMode={setMode}
      />

      <TransformersPanel
        setTransformers={setTransformers}
        commentMap={commentMap}
      />

      <Feed posts={finalPosts} users={users} onSelect={setSelectedPost} />

      <Pagination page={page} setPage={setPage} />

      {selectedPost && (
        <PostDetail
          postId={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}
