import React, { useState } from "react";
import TextLoop from "react-text-loop";
import randomize from "randomatic";

function Spinner() {
  const [luckies, ] = useState([]);
  const [, setLucky] = useState();
  const [mount, setMount] = useState(false);
  const [stop, setStop] = useState(false);
  const [speed, setSpeed] = useState(50);

  const generateNumber = () => {
    if (!mount) {
      for (var i = 0; i < 100; i++) {
        luckies.push(randomize("0", 3));
      }
    }
    setMount(true);
  };

  const stopSpinner = data => {
    if (stop) setSpeed(speed + 5);
    if (speed >= 200) {
      setSpeed(0);
      setLucky(data.currentEl);
    }
  };

  return (
    <div>
      <img
        src="/images/background.jpg"
        className="background"
        alt="background"
      />
      <div className="hero-wrap container">
        <div className="row slider-text align-items-center">
          <div className="col-xl-1 col-lg-1 col-md-1" />
          <div className="col-xl-10 col-lg-10 col-md-10">
            <div className="request-form text-center">
              <div className="form-group lucky-spinner">
                {luckies.length > 1 && (
                  <strong>
                    <TextLoop
                      interval={speed}
                      children={luckies}
                      onChange={stopSpinner}
                    />
                  </strong>
                )}
                {luckies.length < 1 && (
                  <strong>
                    <TextLoop />
                  </strong>
                )}
              </div>
              <div className="form-group spinner">
                {!mount && (
                  <button
                    onClick={generateNumber}
                    className="btn btn-primary mt-5 py-3 px-4"
                  >
                    <strong>Quay may mắn</strong>
                  </button>
                )}
                {mount && (
                  <button
                    onClick={() => setStop(true)}
                    className="btn btn-primary mt-5 py-3 px-4"
                    disabled={stop}
                  >
                    <strong>Dừng quay</strong>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-xl-1 col-lg-1 col-md-1" />
        </div>
      </div>
    </div>
  );
}

export default Spinner;
