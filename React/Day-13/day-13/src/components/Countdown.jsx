import { useEffect, useRef, useState } from "react";
import "./Countdown.css";

function Countdown() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const formatTime = (time) => {
    const m = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const s = (time % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStart = () => {
    if (isRunning) return;

    const total = Number(minutes) * 60 + Number(seconds);
    if (total <= 0) return;

    setTimeLeft(total);
    setIsRunning(true);
  };

  const togglePause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setTimeLeft(0);
    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          alert("Time's Up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div className="timer-container">
      <div className="timer-display">{formatTime(timeLeft)}</div>

      <div className="timer-inputs">
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <input
          type="number"
          placeholder="Seconds"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
      </div>

      <div className="timer-buttons">
        <button
          className="start-btn"
          onClick={handleStart}
          disabled={isRunning}
        >
          Start
        </button>

        <button
          className="pause-btn"
          onClick={togglePause}
          disabled={timeLeft === 0}
        >
          {isRunning ? "Pause" : "Resume"}
        </button>

        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Countdown;
