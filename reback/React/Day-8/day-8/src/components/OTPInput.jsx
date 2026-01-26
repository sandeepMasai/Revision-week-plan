import React, { useState, useRef } from "react";

function OTPInput() {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChang = (e, index) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const clearOtp = () => {
    setOtp(Array(6).fill(""));
    inputRefs.current[0].focus();
  };

  return (
    <div>
      <h2>OTP ENTER</h2>

      <div>
        {otp.map((i, index) => (
          <input
            type="text"
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            maxLength={1}
            value={i}
            onChange={(e) => handleChang(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              width: "40px",
              height: "40px",
              fontSize: "20px",
              textAlign: "center",
            }}
          />
        ))}
      </div>
      <p>{otp.join("")}</p>
      <button onClick={clearOtp}>Clear</button>
    </div>
  );
}

export default OTPInput;
