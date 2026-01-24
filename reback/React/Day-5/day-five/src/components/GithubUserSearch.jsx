import React, { useEffect, useState } from "react";
import axios from "axios";

function GithubUserSearch() {
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!searchTerm) return;

    const controller = new AbortController();

    const fetchUser = async () => {
      setLoading(true);
      setError("");
      setUser(null);

      try {
        const res = await axios.get(
          `https://api.github.com/users/${searchTerm}`,
          { signal: controller.signal }
        );

        setUser(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          if (err.response?.status === 404) {
            setError("User not found");
          } else {
            setError("Something went wrong");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // cleanup → abort stale request
    return () => controller.abort();
  }, [searchTerm]);

  const handleSearch = () => {
    if (!username.trim()) return;
    setSearchTerm(username.trim());
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h2>GitHub User Search</h2>

      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && !loading && !error && (
        <div>
          <img src={user.avatar_url} alt="avatar" width="80" />
          <p>
            <strong>{user.name || user.login}</strong>
          </p>
          <p>{user.bio}</p>
          <p>Followers: {user.followers}</p>
        </div>
      )}
    </div>
  );
}

export default GithubUserSearch;
