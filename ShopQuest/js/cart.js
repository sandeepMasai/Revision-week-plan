const cartDiv = document.getElementById("cart");
const message = document.getElementById("message");

let cart = getFromLS("cart", []);

// Render Cart
function renderCart() {
  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is empty 🛍️</p>";
    return;
  }

  cartDiv.innerHTML = cart
    .map(
      (item, index) => `
      <div style="margin-bottom:10px">
        <strong>Product ID:</strong> ${item.productId}
        <br />
        <strong>Qty:</strong> ${item.qty}
        <br />
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `,
    )
    .join("");
}

function removeItem(index) {
  cart.splice(index, 1);
  saveToLS("cart", cart);
  renderCart();
}

// Checkout
function checkout() {
  const token = getFromLS("token", null);

  if (!token) {
    message.innerText = "⚠ Please login to checkout";
    return;
  }

  if (cart.length === 0) {
    message.innerText = "⚠ Cart is empty";
    return;
  }

  fetchWithRetry("https://fakestoreapi.com/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userId: 1,
      date: new Date(),
      products: cart,
    }),
  })
    .then(() => {
      alert(" Order placed successfully!");
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
    })
    .catch(() => {
      message.innerText = " Checkout failed. Try again.";
    });
}

renderCart();
