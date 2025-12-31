import React from "react";
import Todo from "./components/Todo";
import DragToReorderList from "./components/DragToReorderList";

function App() {
  return (
    <div>
      <Todo />
      <DragToReorderList />
    </div>
  );
}

export default App;
