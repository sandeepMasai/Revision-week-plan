async function fetchWithRetry(
  url,
  options = {},
  maxRetries = 3,
  baseDelay = 500
) {
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      console.log(`Attempt ${attempt + 1}`);

      const response = await fetch(url, options);

      //  HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      attempt++;

      // Stop retrying max attempts
      if (attempt === maxRetries) {
        console.error("Max retries reached");
        throw error;
      }

      //  delay
      const delay = baseDelay * Math.pow(2, attempt);
      console.warn(`Retrying in ${delay}ms...`);

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

(async () => {
  try {
    const data = await fetchWithRetry(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    console.log("Success:", data);
  } catch (error) {
    console.error("Final Error:", error.message);
  }
})();
