import React, { useEffect, useState } from "react";
import axios from "axios";
function FetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [debounces, setDebounces] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 3;

  const lodData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setData(res.data);
    } catch (error) {
      console.error("error", error);
      setError("Loading Date Error......wait some time ");
    } finally {
      setLoading(false);
    }
  };

  const filterData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(debounces.toLowerCase()) ||
      item.email.toLowerCase().includes(debounces.toLowerCase()),
  );

  const lastIndex = currentPage * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;
  const currentItem = filterData.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(filterData.length / itemPerPage);

  useEffect(() => {
    lodData();
  }, []);

  useEffect(() => {
    const time = setTimeout(() => {
      setDebounces(search);
    }, 500);

    return () => clearTimeout(time);
  }, [search]);

  return (
    <div>
      <button onClick={lodData}> Fetch Data</button>

      {loading && <p>Loading....</p>}
      {error && <p style={{ color: "red" }}> {error}</p>}

      <input
        type="search"
        value={search}
        placeholder="search by name "
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {currentItem.map((prod) => (
          <li key={prod.id}>
            <p>Title: {prod.name}</p>
            <p>Body : {prod.email}</p>
          </li>
        ))}
      </ul>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
      >
        Back
      </button>
      <span>
        {currentPage}-{totalPage}
      </span>

      <button
        disabled={currentPage === totalPage}
        onClick={() => setCurrentPage((p) => p + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default FetchData;
