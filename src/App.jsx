import { useState, useEffect } from "react";
let timerInterval;
const App = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const updateElapsedSeconds = () => {
    setElapsedSeconds((prev) => (prev + 1) % 60);
  };
  const updateElapsedMinutes = () => {
    setElapsedMinutes((prev) => prev + Math.floor((elapsedSeconds + 1) / 60));
  };
  const timer = () => {
    updateElapsedSeconds();
    updateElapsedMinutes();
  };
  useEffect(() => {
    if (timerStarted) {
      timerInterval = setInterval(timer, 1000);
    }
    return () => {
      clearInterval(timerInterval);
      console.log("interval cleaned")
    };
  }, [timerStarted,timer]);
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="timer__wrapper max-w-96 w-full bg-gray-400 text-center p-5 space-y-4">
        <h1 className="text-4xl">Timer App</h1>
        <div className="text-6xl" id="timerDisplay">
          {`${elapsedMinutes < 10 ? `0${elapsedMinutes}` : elapsedSeconds}:${
            elapsedSeconds < 10 ? `0${elapsedSeconds}` : elapsedSeconds
          }`}
        </div>
        <div className="buttons space-x-4">
          <button
            onClick={() => setTimerStarted(true)}
            id="startButton"
            className="bg-gray-500 px-3 py-1"
          >
            Start
          </button>
          <button
            onClick={() => setTimerStarted(false)}
            id="stopButton"
            className="bg-gray-500 px-3 py-1"
          >
            Stop
          </button>
          <button
            onClick={() => {
              setTimerStarted(false);
              setElapsedSeconds(0);
              setElapsedMinutes(0);
            }}
            id="resetButton"
            className="bg-gray-500 px-3 py-1"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
