import React, { useState } from "react";

function PasswordValidator() {
  const [password, setPassword] = useState("");

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const passwordCount = Object.values(checks).filter(Boolean).length;

  const borderColor =
    passwordCount <= 1 ? "red" : passwordCount <= 3 ? "orange" : "green";

  return (
    <div>
      <h2>Password Checker</h2>

      <label>Password</label>
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
        style={{
          border: `4px solid ${borderColor}`,
          padding: "8px",
          width: "250px",
        }}
      />

      <ul>
        <li>{checks.length ? "✓" : "✗"} Min 8 characters</li>
        <li>{checks.upper ? "✓" : "✗"} Uppercase letter</li>
        <li>{checks.number ? "✓" : "✗"} Number</li>
        <li>{checks.special ? "✓" : "✗"} Special character</li>
      </ul>
    </div>
  );
}

export default PasswordValidator;
