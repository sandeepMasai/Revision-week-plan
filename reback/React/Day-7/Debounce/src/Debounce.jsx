import React, { useEffect, useState, useMemo } from "react";

// Mock product data
const PRODUCTS = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ["Electronics", "Clothing", "Food", "Books"][i % 4],
  price: (Math.random() * 100 + 10).toFixed(2),
}));

function Debounce() {
  const [search, setSearch] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    setSearching(true);

    const timer = setTimeout(() => {
      setSearchDebounce(search);
      setSearching(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const filterData = useMemo(() => {
    return PRODUCTS.filter(
      (item) =>
        item.name.toLowerCase().includes(searchDebounce.toLocaleLowerCase()) ||
        item.category.toLowerCase().includes(searchDebounce.toLocaleLowerCase())
    );
  }, [searchDebounce]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search name "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {searching && <p>Search.....</p>}

      <ul>
        {filterData.map((products) => (
          <li key={products.id}>
            <p>
              Name: {products.name} - {products.category} -$ {products.price}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Debounce;
