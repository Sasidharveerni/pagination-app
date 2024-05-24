import React, { useState, useEffect } from 'react';

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  useEffect(() => {
    let timerInterval;
    if (isRunning) {
      timerInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((prev) => prev - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          clearInterval(timerInterval);
          setIsRunning(false);
        }
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isRunning, hours, minutes, seconds]);

  const IncrementH = () => {
    setHours((prev) => prev + 1);
  };

  const IncrementM = () => {
    setMinutes((prev) => prev + 1);
  };

  const IncrementS = () => {
    setSeconds((prev) => prev + 1);
  };

  const DecrementS = () => {
    if(seconds > 0) {

        setSeconds((prev) => prev - 1);
    } else {
        setSeconds(0);
    }
  }

  const DecrementM = () => {
    if(minutes > 0) {

        setMinutes((prev) => prev - 1);
    } else {
        setMinutes(0);
    }
  }

  const DecrementH = () => {
    if(hours > 0) {

        setSeconds((prev) => prev - 1);
    } else {
        setHours(0);
    }
  }


  const Reset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
  };

  const timeStart = () => {
    setIsRunning(true);
  };

  return (
    <div className='App'>
      <h1>Set your timer!</h1>
      <h3>
        {formatTime(hours)} : {formatTime(minutes)} : {formatTime(seconds)}
      </h3>
      <div>

      <button onClick={IncrementH}>Increment hours</button>
      <button onClick={IncrementM}>Increment minutes</button>
      <button onClick={IncrementS}>Increment seconds</button>
      </div>
      <div>
      <button onClick={DecrementH}>Decrement hours</button>
      <button onClick={DecrementM}>Decrement minutes</button>
      <button onClick={DecrementS}>Decrement seconds</button>
      </div>
      <div>
        <button onClick={Reset}>Reset</button>
        <button onClick={timeStart}>Start</button>
      </div>
    </div>
  );
}

export default Timer;
