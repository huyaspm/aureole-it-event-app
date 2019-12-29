import React, { useState, useEffect } from "react";

const initialState = {
  years: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  millisecond: 0
};

function Countdown({ eventTime }) {
  // const eventTime = "Fri Jan 10 2020 18:00:00 GMT+0700 (Indochina Time)";

  const [countdown, setCountdown] = useState(initialState);
  const [, forceUpdate] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = calculate();
      if (date) setCountdown(date);
      else {
        setCountdown(null);
        clearInterval(interval);
      }
      forceUpdate(up => !up);
    }, 1000);
  }, [countdown]);

  const calculate = () => {
    var count =
      (Date.parse(new Date(eventTime)) - Date.parse(new Date())) / 1000;
    if (count <= 0) return null;
    const timeLeft = initialState;
    if (count >= 365.25 * 86400) {
      timeLeft.years = Math.floor(count / (365.25 * 86400));
      count -= timeLeft.years * 365.25 * 86400;
    }
    if (count >= 86400) {
      timeLeft.days = Math.floor(count / 86400);
      count -= timeLeft.days * 86400;
    }
    if (count >= 3600) {
      timeLeft.hours = Math.floor(count / 3600);
      count -= timeLeft.hours * 3600;
    }
    if (count >= 60) {
      timeLeft.minutes = Math.floor(count / 60);
      count -= timeLeft.minutes * 60;
    }
    timeLeft.seconds = count;
    return timeLeft;
  };

  const format = value => {
    value = String(value);
    while (value.length < 2) value = "0" + value;
    return value;
  };

  return countdown ? (
    <div id="timer" className="d-flex mb-5">
      <div className="time pl-3">
        {format(countdown.days)}
        <span>Ngày</span>
      </div>
      <div className="time pl-3">
        {format(countdown.hours)}
        <span>Giờ</span>
      </div>
      <div className="time pl-3">
        {format(countdown.minutes)}
        <span>Phút</span>
      </div>
      <div className="time pl-3">
        {format(countdown.seconds)}
        <span>Giây</span>
      </div>
    </div>
  ) : (
    <h2 className="mt-5 mb-5">
      <em>Sự kiện kết thúc</em>
    </h2>
  );
}

export default Countdown;
