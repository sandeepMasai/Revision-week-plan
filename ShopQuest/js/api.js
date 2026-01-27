const BASE_URL = "https://fakestoreapi.com";

function fetchWithRetry(url, options = {}, retries = 2) {
  const start = performance.now();

  return Promise.race([fetch(url, options), timeoutPromise(5000)])
    .then((res) => {
      const duration = Math.round(performance.now() - start);
      logRequest({
        url,
        method: options.method || "GET",
        status: res.status,
        duration,
        source: "network",
      });
      if (!res.ok) throw "API Error";
      return res.json();
    })
    .catch((err) => {
      if (retries > 0) {
        return fetchWithRetry(url, options, retries - 1);
      }
      throw err;
    });
}
