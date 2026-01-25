import React, { useMemo, useState } from "react";

function analyzeNumber(num) {
  let calculationCount = 0;
  const factors = [];

  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      factors.push(i);
      calculationCount++;
    }
  }

  return {
    isPrime: factors.length === 2,
    factors,
    sum: factors.reduce((a, b) => a + b, 0),
    calculationCount,
  };
}

function Expensive() {
  const [number, setNumber] = useState(10);
  const [darkMode, setDarkMode] = useState(false);

  // Expensive calculation runs ONLY when number changes
  const analysis = useMemo(() => {
    console.log("🔁 Expensive calculation running...");
    return analyzeNumber(number);
  }, [number]);

  return (
    <div
      style={{
        padding: "20px",
        background: darkMode ? "#222" : "#f9f9f9",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <h2>Number Analyzer</h2>

      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <button onClick={() => setDarkMode((prev) => !prev)}>Toggle Theme</button>

      <hr />

      <p>
        <strong>Is Prime:</strong> {analysis.isPrime ? "Yes" : "No"}
      </p>
      <p>
        <strong>Factors:</strong> {analysis.factors.join(", ")}
      </p>
      <p>
        <strong>Sum of Factors:</strong> {analysis.sum}
      </p>
      <p>
        <strong>Calculation Count:</strong> {analysis.calculationCount}
      </p>
    </div>
  );
}

export default Expensive;
