let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const PAGE_SIZE = 6;

const productDiv = document.getElementById("products");
const categorySelect = document.getElementById("category");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const paginationDiv = document.getElementById("pagination");
const searchHistoryUl = document.getElementById("searchHistory");

//   LOAD PRODUCTS + CATEGORIES

function loadInitialData() {
  Promise.all([
    fetchWithRetry("https://fakestoreapi.com/products"),
    fetchWithRetry("https://fakestoreapi.com/products/categories"),
  ])
    .then(([products, categories]) => {
      allProducts = products;
      filteredProducts = products;
      saveToLS("products_cache", products);
      populateCategories(categories);
      renderProducts();
      renderSearchHistory();
    })
    .catch(() => {
      allProducts = getFromLS("products_cache", []);
      filteredProducts = allProducts;
      document.getElementById("cachedLabel").innerText =
        " Loaded from cached data";
      renderProducts();
      renderSearchHistory();
    });
}

//   CATEGORY DROPDOWN

function populateCategories(categories) {
  categorySelect.innerHTML = `
    <option value="">All Categories</option>
    ${categories.map((cat) => `<option value="${cat}">${cat}</option>`).join("")}
  `;
}

// SEARCH HISTORY (NEW)

function saveSearchHistory(term) {
  if (!term) return;

  let history = getFromLS("search_history", []);

  history = history.filter((item) => item !== term);
  history.unshift(term);

  if (history.length > 5) history.pop();

  saveToLS("search_history", history);
  renderSearchHistory();
}

function renderSearchHistory() {
  const history = getFromLS("search_history", []);

  searchHistoryUl.innerHTML = history
    .map(
      (term) => `
      <li style="cursor:pointer" onclick="applyHistorySearch('${term}')">
        ${term}
      </li>
    `,
    )
    .join("");
}

function applyHistorySearch(term) {
  searchInput.value = term;
  applyFilters();
}

// APPLY FILTERS
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;
  const sortOrder = sortSelect.value;

  filteredProducts = allProducts
    .filter((p) => p.title.toLowerCase().includes(searchTerm))
    .filter((p) => (selectedCategory ? p.category === selectedCategory : true))
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price,
    );

  currentPage = 1;
  renderProducts();
  saveSearchHistory(searchTerm);
}

// RENDER PRODUCTS
function renderProducts() {
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageItems = filteredProducts.slice(start, end);

  if (pageItems.length === 0) {
    productDiv.innerHTML = "<p>No products found</p>";
  } else {
    productDiv.innerHTML = pageItems
      .map(
        (p) => `
        <div class="card">
          <img src="${p.image}" />
          <h4>${p.title}</h4>
          <p>₹${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      `,
      )
      .join("");
  }

  renderPagination();
}

//   PAGINATION (Prev 1 2 3 Next)

function renderPagination() {
  paginationDiv.innerHTML = "";

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  if (totalPages <= 1) return;

  const prevBtn = document.createElement("button");
  prevBtn.innerText = "Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    renderProducts();
  };
  paginationDiv.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    if (i === currentPage) btn.classList.add("active");

    btn.onclick = () => {
      currentPage = i;
      renderProducts();
    };
    paginationDiv.appendChild(btn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    renderProducts();
  };
  paginationDiv.appendChild(nextBtn);
}

// CART

function addToCart(id) {
  const cart = getFromLS("cart", []);
  cart.push({ productId: id, qty: 1 });
  saveToLS("cart", cart);
  alert("Added to cart");
}

//   EVENTS
searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

loadInitialData();
