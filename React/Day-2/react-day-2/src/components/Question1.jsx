import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Question1() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("status");

  useEffect(() => {
    if (!text) {
      setStatus("status");
      return;
    }
    setStatus("Saving...");
    const time = setTimeout(() => {
      console.log("Saved:", text);
      setStatus("Saved");
    }, 2000);

    return () => {
      clearTimeout(time);
    };
  }, [text]);

  return (
    <div>
      <h2>Auto Save Notes</h2>

      <input
        type="text"
        placeholder="Input text Enter"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p>{status}</p>
      <p>{text}</p>
    </div>
  );
}

export default Question1;
