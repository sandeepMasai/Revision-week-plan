function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLS(key, fallback = []) {
  return JSON.parse(localStorage.getItem(key)) || fallback;
}

function timeoutPromise(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(" Request Timeout"), ms),
  );
}
