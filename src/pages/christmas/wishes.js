import React, { useState, useEffect, useContext } from "react";
import SplitText from "react-pose-text";
import axios from "axios";

import { ManagerContext } from "../../contexts/manager";

const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 100
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

function Wishes() {
  useContext(ManagerContext);
  const [mount, setMount] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [speed, setSpeed] = useState();
  const [wish, setWish] = useState(" ");

  useEffect(() => {
    if (!mount) {
      axios.post("/gifts").then(res => {
        res.data.forEach(gift => {
          if (gift.description !== "") wishes.push(gift.description);
        });
      });
    }
    setMount(true);
  });

  useEffect(() => {
    setTimeout(
      () => {
        setWishes(shuffle(wishes));
        setWish(wishes[0]);
        setSpeed(wishes[0].length * 100 + 1500);
      },
      speed ? speed : 3000
    );
  }, [speed]);

  return (
    <div>
      <img
        src="/images/christmas-background.jpg"
        className="background"
        alt="background"
      />
      <div className="hero-wrap container">
        <div className="row slider-text align-items-center">
          <div className="col-12 text-center wishes christmas-card">
            <div className="special-card" />
            <h1>
              <span>
                {wishes && (
                  <SplitText
                    initialPose="exit"
                    pose="enter"
                    charPoses={charPoses}
                  >
                    {wish}
                  </SplitText>
                )}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishes;
