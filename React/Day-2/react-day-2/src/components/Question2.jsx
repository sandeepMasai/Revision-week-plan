import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Question2() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleSize();
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  const deviceType =
    size.width < 786 ? (
      <div
        style={{
          width: "700px",
          height: "300px",
          backgroundColor: "blue",
          border: "2px solid red",
        }}
      >
        <h2>Mobile...</h2>
      </div>
    ) : size.width <= 1024 ? (
      <div style={{ width: "600px", height: "300px", backgroundColor: "red" }}>
        <h2>Tablet...</h2>
      </div>
    ) : (
      <div
        style={{
          width: "800px",
          height: "350px",
          backgroundColor: "green",
          border: "2px solid red",
        }}
      >
        <h2>deskTop...</h2>
      </div>
    );

  return (
    <div>
      <h2>Window Resize Tracker</h2>
      <h2>{deviceType}</h2>
      <p>
        {size.width} × {size.height}
      </p>
    </div>
  );
}

export default Question2;
