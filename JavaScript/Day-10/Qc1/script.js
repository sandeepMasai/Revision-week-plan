const products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 75 },
  { id: 4, name: "Monitor", price: 299 },
];

let cart = [];

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");

function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <span>${product.name} - $${product.price}</span>
      <button onclick="addToCart(${product.id})">Add</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  const item = cart.find((p) => p.id === id);
  if (item) {
    item.qty++;
  } else {
    const product = products.find((p) => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
}

function updateQty(id, change) {
  const item = cart.find((p) => p.id === id);
  item.qty += change;
  if (item.qty === 0) {
    cart = cart.filter((p) => p.id !== id);
  }
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((p) => p.id !== id);
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} ($${item.price})</span>
      <div class="qty-controls">
        <button onclick="updateQty(${item.id}, -1)">-</button>
        ${item.qty}
        <button onclick="updateQty(${item.id}, 1)">+</button>
        <button onclick="removeItem(${item.id})">❌</button>
      </div>
    `;
    cartItems.appendChild(div);
  });

  const tax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax;
  totalEl.textContent = total;
}

renderProducts();
