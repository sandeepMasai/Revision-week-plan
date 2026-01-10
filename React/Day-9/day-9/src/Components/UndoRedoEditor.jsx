import { useState } from "react";

export default function UndoRedoEditor() {
  const [history, setHistory] = useState([""]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentText = history[currentIndex];

  const handleChange = (e) => {
    const newText = e.target.value;

    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newText);

    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h3>Undo / Redo Text Editor</h3>

      <textarea
        value={currentText}
        onChange={handleChange}
        rows={5}
        style={{ width: "100%" }}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={undo} disabled={currentIndex === 0}>
          Undo
        </button>

        <button
          onClick={redo}
          disabled={currentIndex === history.length - 1}
          style={{ marginLeft: "10px" }}
        >
          Redo
        </button>
      </div>

      <p style={{ marginTop: "10px" }}>
        History: {currentIndex + 1}/{history.length}
      </p>
    </div>
  );
}
