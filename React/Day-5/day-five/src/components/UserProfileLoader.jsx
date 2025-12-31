import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProfileLoader() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (signal) => {
    setLoading(true);
    try {
      setError("");

      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1",
        { signal }
      );

      setUser(res.data);
    } catch (err) {
      if (err.name !== "CanceledError") {
        setError("Failed to load user");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    return () => controller.abort();
  }, []);

  const handleRetry = () => {
    const controller = new AbortController();
    fetchData(controller.signal);
  };

  return (
    <div>
      <h2>UserProfileLoader</h2>

      {loading && <p>Loading...</p>}

      {error && (
        <>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={handleRetry}>Retry</button>
        </>
      )}

      {user && !loading && !error && (
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfileLoader;
