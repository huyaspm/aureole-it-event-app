import React, { useState, useEffect } from "react";
import SplitText from "react-pose-text";
import axios from "axios";

const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 75
  }
};

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function Navigation() {
  const [mount, setMount] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [speed, setSpeed] = useState();
  const [wish, setWish] = useState(" ");

  useEffect(() => {
    if (!mount) {
      axios.get("/gift/wishes").then(res => {
        res.data.forEach(wish => {
          if (wish !== "") wishes.push(wish);
        });
      });
    }
    setMount(true);
  });

  useEffect(() => {
    setTimeout(
      () => {
        setWishes(shuffle(wishes));
        setWish(
          wishes[0].length > 200
            ? wishes[0].substring(0, 200) + "..."
            : wishes[0]
        );
        setSpeed(wishes[0].length * 100 + 1500);
      },
      speed ? speed : 3000
    );
  }, [speed]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.reload();
    }, 120000);
    return clearTimeout(timeout);
  });

  return (
    <>
      {wishes && (
        <div className="col-12 text-center christmas-navbar mt-5">
          <h1>
            <span style={{ fontSize: "18px" }}>
              <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
                {wish}
              </SplitText>
            </span>
          </h1>
        </div>
      )}
    </>
  );
}

export default Navigation;
