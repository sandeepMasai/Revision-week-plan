async function fetchAndTransformUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  const result = users
    .filter((user) => user.username.length > 6)
    .map((user) => ({
      id: user.id,
      fullName: user.name,
      email: user.email,
    }));

  console.log(result);
  return result;
}

fetchAndTransformUsers();
