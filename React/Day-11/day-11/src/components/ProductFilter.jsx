import { useMemo, useState } from "react";

const PRODUCTS = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ["Electronics", "Clothing", "Books", "Home"][i % 4],
  price: Math.floor(Math.random() * 200) + 20,
  inStock: Math.random() > 0.3,
}));

const CATEGORIES = ["Electronics", "Clothing", "Books", "Home"];

function ProductFilter() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }

      if (priceRange.min !== "" && product.price < Number(priceRange.min)) {
        return false;
      }
      if (priceRange.max !== "" && product.price > Number(priceRange.max)) {
        return false;
      }

      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });
  }, [selectedCategories, priceRange, inStockOnly]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: "", max: "" });
    setInStockOnly(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h2>Advanced Product Filter</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div>
          <h4>Category</h4>
          {CATEGORIES.map((cat) => (
            <label key={cat} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>

        <div>
          <h4>Price Range</h4>
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, min: e.target.value }))
            }
            style={{ width: "80px", marginRight: "8px" }}
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange((prev) => ({ ...prev, max: e.target.value }))
            }
            style={{ width: "80px" }}
          />
        </div>

        <div>
          <h4>Availability</h4>
          <label>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
            />
            In Stock Only
          </label>
        </div>
      </div>

      <button onClick={clearFilters} style={{ marginTop: "10px" }}>
        Clear All Filters
      </button>

      <h3 style={{ marginTop: "20px" }}>
        Showing {filteredProducts.length} results
      </h3>

      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> — {product.category} ₹
            {product.price} — {product.inStock ? "In Stock" : "Out of Stock"}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProductFilter;
