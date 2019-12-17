import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TextLoop from "react-text-loop";

import { ManagerContext } from "../../contexts/manager";

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

export default function Pairing() {
  useContext(ManagerContext);

  const [mount, setMount] = useState(false);

  const [giver, setGiver] = useState([]);
  const [taker, setTaker] = useState([]);

  const [result, setResult] = useState({
    giver: null,
    taker: null
  });

  const [message, setMessage] = useState({
    giver: "huareeyyy",
    taker: "huareeyyy"
  });

  const [control, setControl] = useState({
    start: false,
    stop: false,
    finish: true
  });

  const [speed, setSpeed] = useState({
    giver: 0,
    taker: 0
  });

  useEffect(() => {
    if (!mount) {
      axios.post("/gifts").then(res => {
        res.data.forEach(gift => {
          if (gift.exchange.givenTo.uid === "") giver.push(gift.fullName);
          if (gift.exchange.takenFrom.uid === "") taker.push(gift.fullName);
        });
      });
    }
    setMount(true);
  });

  const handleGiver = data => {
    if (control.stop) setSpeed({ ...speed, giver: speed.giver + 10 });
    if (speed.giver >= 200) {
      setSpeed({ ...speed, giver: 0 });
      axios
        .post("/gift/name", {
          fullName: data.currentEl
        })
        .then(res => {
          setMessage({ ...message, giver: res.data.description });
          return res.data;
        })
        .then(res => {
          
          setResult({ ...result, giver: res });
        })
        .catch(err => console.log(err));
    }
  };

  const handleTaker = data => {
    if (control.stop) setSpeed({ ...speed, taker: speed.taker + 10 });
    if (speed.taker >= 200) {
      setSpeed({ ...speed, taker: 0 });
      axios
        .post("/gift/name", {
          fullName: data.currentEl
        })
        .then(res => {
          setMessage({ ...message, taker: res.data.description });
          setControl({ ...control, start: false, finish: true });
          return res.data;
        })
        .catch(err => console.log(err));
    }
  };

  const startSpinner = () => {
    setGiver(shuffle(giver));
    setTaker(shuffle(taker));
    setSpeed({ ...speed, giver: 50, taker: 50 });
    setControl({ ...control, start: true, stop: false, finish: false });
  };

  return (
    <div>
      <img
        src="/images/chistmas-background.jpg"
        className="background"
        alt="background"
      />
      <div className="hero-wrap container">
        <div className="row slider-text align-items-center">
          <div className="col-12">
            <div className="request-form pt-5">
              <div className="form-group">
                {giver.length > 1 && taker.length > 1 && (
                  <div className="row">
                    <div className="col-5 mt-5 mb-5">
                      <strong style={{ fontSize: "30px" }}>
                        <TextLoop
                          name="giver"
                          interval={parseInt(speed.giver)}
                          children={giver}
                          onChange={handleGiver}
                          className="ml-5"
                        />
                      </strong>
                      <div className="ml-5 mt-4" style={{ fontSize: "20px" }}>
                        {control.finish && message.giver}
                      </div>
                    </div>
                    <div
                      className="col-2 text-center mt-5 mb-5"
                      style={{ fontSize: "30px" }}
                    >
                      <strong>
                        <i className="fa fa-arrow-right"></i>
                      </strong>
                    </div>
                    <div className="col-5 mt-5 mb-5">
                      <strong style={{ fontSize: "30px" }}>
                        <TextLoop
                          name="taker"
                          interval={parseInt(speed.taker)}
                          children={taker}
                          onChange={handleTaker}
                          className="ml-5"
                        />
                      </strong>
                      <div className="ml-5 mt-4" style={{ fontSize: "20px" }}>
                        {control.finish && message.taker}
                      </div>
                    </div>
                  </div>
                )}
                {giver.length < 1 && (
                  <div className="mt-5 mb-5" style={{ fontSize: "30px" }}>
                    <TextLoop />
                  </div>
                )}
              </div>
              <div className="form-group spinner">
                {!control.start && control.finish && (
                  <button
                    onClick={startSpinner}
                    className="btn btn-primary mt-5 py-3 px-4"
                  >
                    <strong>Quay may mắn</strong>
                  </button>
                )}
                {control.start && (
                  <button
                    onClick={() => {
                      setControl({ ...control, stop: true });
                    }}
                    className="btn btn-primary mt-5 py-3 px-4"
                    disabled={control.stop}
                  >
                    <strong>Dừng quay</strong>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
