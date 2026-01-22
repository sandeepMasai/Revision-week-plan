import React, { useState } from "react";

const initialTasks = [
  "Write documentation",
  "Fix bugs",
  "Push code to GitHub",
  "Deploy app",
];

function DragToReorderList() {
  const [tasks, setTask] = useState(initialTasks);

  const moveUp = (index) => {
    if (index === 0) return;

    const newTask = [...tasks];
    [newTask[index - 1], newTask[index]] = [newTask[index], newTask[index - 1]];
    setTask(newTask);
  };

  const moveDown = (index) => {
    if (index === tasks.length - 1) return;

    const newTask = [...tasks];
    [newTask[index], newTask[index + 1]] = [newTask[index + 1], newTask[index]];
    setTask(newTask);
  };

  return (
    <div>
      <h2>DragToReorderList</h2>

      {tasks.map((task, index) => (
        <div key={task}>
          <strong>{index + 1}. </strong>
          <span>{task}</span>

          <button onClick={() => moveUp(index)} disabled={index === 0}>
            Up
          </button>

          <button
            onClick={() => moveDown(index)}
            disabled={index === tasks.length - 1}
          >
            Down
          </button>
        </div>
      ))}
    </div>
  );
}

export default DragToReorderList;
