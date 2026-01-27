function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.innerText = "";

  fetchWithRetry(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((data) => {
      saveToLS("token", data.token);
      saveToLS("user", username);
      window.location.href = "index.html";
    })
    .catch(() => {
      error.innerText = " Invalid username or password";
    });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}
