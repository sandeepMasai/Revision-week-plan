import React, { useEffect, useState } from "react";

function StopWatch() {
  //   const [seconds, setSeconds] = useState(0);
  //   const [isRunning, setIsRunning] = useState(false);

  //   useEffect(() => {
  //     let time;
  //     if (isRunning) {
  //       time = setInterval(() => {
  //         setSeconds((prev) => prev + 1);
  //       }, 1000);
  //       return () => clearInterval(time);
  //     }
  //   }, [isRunning]);

  const [seconds, setSecond] = useState(0);
  const [isRunning, setRunning] = useState(false);

  useEffect(() => {
    let time;
    if (isRunning) {
      time = setInterval(() => {
        setSecond((t) => t + 1);
      }, 1000);
      return () => clearInterval(time);
    }
  }, [isRunning]);
  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const reset = () => {
    setSecond(0);
    setRunning(false);
  };

  return (
    <div style={{ marginLeft: "500px", marginTop: "200px" }}>
      <h2 style={{ fontSize: "40px" }}>Time</h2>
      <span style={{ fontSize: "100px" }}>Timer: {seconds}</span> <br />
      <div>
        <button
          style={{
            fontSize: "50px",
            marginLeft: "10px",
            borderRadius: "30px",
            backgroundColor: "green",
          }}
          onClick={start}
        >
          Start
        </button>
        <button
          style={{
            fontSize: "50px",
            backgroundColor: "red",
            borderRadius: "20px",
          }}
          onClick={stop}
        >
          Stop
        </button>
        <button
          style={{
            fontSize: "50px",
            borderRadius: "20px",
            backgroundColor: "blue",
          }}
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
