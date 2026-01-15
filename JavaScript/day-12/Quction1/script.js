const allItems = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}));

const list = document.getElementById("list");
const loading = document.getElementById("loading");
const end = document.getElementById("end");

let currentIndex = 0;
const ITEMS_PER_LOAD = 10;
let isLoading = false;

function renderItems(items) {
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    `;
    list.appendChild(div);
  });
}

function loadMoreItems() {
  if (isLoading) return;
  isLoading = true;
  loading.style.display = "block";

  setTimeout(() => {
    const nextItems = allItems.slice(
      currentIndex,
      currentIndex + ITEMS_PER_LOAD
    );

    if (nextItems.length === 0) {
      loading.style.display = "none";
      end.style.display = "block";
      window.removeEventListener("scroll", handleScroll);
      return;
    }

    renderItems(nextItems);
    currentIndex += ITEMS_PER_LOAD;
    loading.style.display = "none";
    isLoading = false;
  }, 800);
}

function handleScroll() {
  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.body.offsetHeight - 100;

  if (scrollPosition >= threshold) {
    loadMoreItems();
  }
}

loadMoreItems();
window.addEventListener("scroll", handleScroll);
