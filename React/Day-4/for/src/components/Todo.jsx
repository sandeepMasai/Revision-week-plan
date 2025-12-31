import React from "react";
import { useState } from "react";

const PRIORITY_COLORS = {
  High: "red",
  Medium: "orange",
  Low: "green",
};

const initialTodos = [
  {
    id: "1",
    text: "Complete React project",
    priority: "High",
    completed: false,
  },
  { id: "2", text: "Review PRs", priority: "Medium", completed: true },
  { id: "3", text: "Update documentation", priority: "Low", completed: false },
];

function Todo() {
  const [todos, setTodo] = useState(initialTodos);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Low");

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now().toString(),
      text,
      priority,
      completed: false,
    };

    setTodo((prev) => [...prev, newTodo]);
    setText("");
    setPriority("Low");
  };

  const toggleTodo = (id) => {
    setTodo((prev) =>
      prev.map((todo) =>
        todo.id == id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((todo) => todo.id !== id));
  };
  return (
    <div>
      <h2>Todo App</h2>
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select value={priority} onChange={(x) => setPriority(x.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                marginRight: 8,
              }}
            >
              {todo.text}
            </span>
            <span
              style={{
                color: "white",
                backgroundColor: PRIORITY_COLORS[todo.priority],
                padding: "2px 6px",
                borderRadius: "8px",
                marginRight: 8,
              }}
            >
              {todo.priority}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Remove Todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
