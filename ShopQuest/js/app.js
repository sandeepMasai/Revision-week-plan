function loginUser(username, password) {
  return fetchWithRetry(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((data) => {
      localStorage.setItem("auth_token", data.token);
      updateAuthState();
    })
    .catch((err) => alert("Login Failed: " + err.message));
}

function checkout() {
  const token = localStorage.getItem("auth_token");
  if (!token) return alert("Please login to checkout");

  const cartData = {
    userId: 5,
    date: new Date().toISOString(),
    products: cart.map((item) => ({ productId: item.id, quantity: item.qty })),
  };

  return fetchWithRetry(`${API_BASE}/carts`, {
    method: "POST",
    body: JSON.stringify(cartData),
  }).then(() => {
    alert("Checkout Successful!");
    clearCart();
  });
}
