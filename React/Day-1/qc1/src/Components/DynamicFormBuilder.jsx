import React, { useState } from "react";

function DynamicFormBuilder() {
  const [question, setQuestion] = useState([
    { id: Date.now(), text: "", type: "text" },
  ]);

  const addQuestion = () => {
    setQuestion([...question, { id: Date.now(), text: "", type: "text" }]);
  };

  const removeQuestion = (id) => {
    setQuestion(question.filter((item) => item.id !== id));
  };

  const updateQuestionText = (id, value) => {
    setQuestion(
      question.map((item) => (item.id === id ? { ...item, text: value } : item))
    );
  };

  const updateQuestionType = (id, value) => {
    setQuestion(question.map((q) => (q.id === id ? { ...q, type: value } : q)));
  };

  return (
    <div>
      <h2>Dynamic From </h2>
      {question.map((t) => (
        <div key={t.id}>
          <input
            type="text"
            value={t.text}
            onChange={(e) => updateQuestionText(t.id, e.target.value)}
          />

          <select
            value={t.type}
            onChange={(e) => updateQuestionType(t.id, e.target.value)}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
          </select>

          <button onClick={() => removeQuestion(t.id)}>Remove</button>
        </div>
      ))}

      <button onClick={addQuestion}>Add Question</button>

      <hr />
      <h2>Live Show data</h2>
      {question.map((item) => (
        <div key={item.id}>
          <p>{item.text || "Untitled Question"} </p>
          <input type={item.type} disabled />
        </div>
      ))}
    </div>
  );
}

export default DynamicFormBuilder;
