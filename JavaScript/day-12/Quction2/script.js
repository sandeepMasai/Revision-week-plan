const tasks = [
  { id: 1, text: "Complete project proposal" },
  { id: 2, text: "Review code submissions" },
  { id: 3, text: "Update documentation" },
  { id: 4, text: "Team meeting" },
];

const list = document.getElementById("list");
let draggedItem = null;

function render() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const dropZone = document.createElement("div");
    dropZone.className = "drop-zone";
    dropZone.dataset.index = index;
    list.appendChild(dropZone);

    const li = document.createElement("li");
    li.textContent = task.text;
    li.draggable = true;
    li.dataset.index = index;

    li.addEventListener("dragstart", () => {
      draggedItem = index;
      li.classList.add("dragging");
    });

    li.addEventListener("dragend", () => {
      draggedItem = null;
      li.classList.remove("dragging");
    });

    list.appendChild(li);
  });

  const lastDropZone = document.createElement("div");
  lastDropZone.className = "drop-zone";
  lastDropZone.dataset.index = tasks.length;
  list.appendChild(lastDropZone);
}

list.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("drop-zone")) {
    e.target.classList.add("active");
  }
});

list.addEventListener("dragleave", (e) => {
  if (e.target.classList.contains("drop-zone")) {
    e.target.classList.remove("active");
  }
});

list.addEventListener("drop", (e) => {
  e.preventDefault();

  if (!e.target.classList.contains("drop-zone")) return;

  const dropIndex = Number(e.target.dataset.index);

  if (draggedItem === null || draggedItem === dropIndex) return;

  const movedItem = tasks.splice(draggedItem, 1)[0];
  tasks.splice(
    dropIndex > draggedItem ? dropIndex - 1 : dropIndex,
    0,
    movedItem
  );

  render();
});

render();
