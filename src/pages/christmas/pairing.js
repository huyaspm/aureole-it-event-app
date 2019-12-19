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

function similar(array, string) {
  if (array.indexOf(string) === -1) return true;
  else return false;
}

function Pairing() {
  useContext(ManagerContext);
  const [gifts, setGifts] = useState([]);

  const [mount, setMount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(true);

  const [giver, setGiver] = useState([" "]);
  const [taker, setTaker] = useState([" "]);

  const [giverPast, setGiverPast] = useState([]);
  const [takerPast, setTakerPast] = useState([]);

  // textLoop

  const [given, setGiven] = useState();
  const [taken, setTaken] = useState();

  const [givenMessage, setGivenMessage] = useState();

  const [control, setControl] = useState({
    start: false,
    stop: false,
    finish: true,
    update: false
  });

  const [speed, setSpeed] = useState({
    giver: 0,
    taker: 0
  });

  // textLoop2

  const [given2, setGiven2] = useState();
  const [taken2, setTaken2] = useState();

  const [givenMessage2, setGivenMessage2] = useState();

  const [control2, setControl2] = useState({
    start: false,
    stop: false,
    finish: true,
    update: false,
    active: true
  });

  const [speed2, setSpeed2] = useState({
    giver: 0,
    taker: 0
  });

  // textLoop3

  const [given3, setGiven3] = useState();
  const [taken3, setTaken3] = useState();

  const [givenMessage3, setGivenMessage3] = useState();

  const [control3, setControl3] = useState({
    start: false,
    stop: false,
    finish: true,
    update: false,
    active: true
  });

  const [speed3, setSpeed3] = useState({
    giver: 0,
    taker: 0
  });

  // textLoop4

  const [given4, setGiven4] = useState();
  const [taken4, setTaken4] = useState();

  const [givenMessage4, setGivenMessage4] = useState();

  const [control4, setControl4] = useState({
    start: false,
    stop: false,
    finish: true,
    update: false,
    active: true
  });

  const [speed4, setSpeed4] = useState({
    giver: 0,
    taker: 0
  });

  // textLoop5

  const [given5, setGiven5] = useState();
  const [taken5, setTaken5] = useState();

  const [givenMessage5, setGivenMessage5] = useState();

  const [control5, setControl5] = useState({
    start: false,
    stop: false,
    finish: true,
    update: false,
    active: true
  });

  const [speed5, setSpeed5] = useState({
    giver: 0,
    taker: 0
  });

  useEffect(() => {
    if (!mount) {
      axios.post("/gifts").then(res => {
        setGifts(res.data);
        res.data.forEach(gift => {
          if (gift.exchange.givenTo.uid === "") giver.push(gift.fullName);
          if (gift.exchange.takenFrom.uid === "") taker.push(gift.fullName);
        });
      });
    }
    setMount(true);
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  // textLoop1

  const handleGiver = data => {
    setGiven(null);
    if (control.stop) setSpeed({ ...speed, giver: speed.giver + 10 });
    if (speed.giver >= 125) setControl2({ ...control2, stop: true });
    if (speed.giver >= 150) {
      if (!similar(giverPast, data.currentEl)) {
        return;
      } else {
        setSpeed({ ...speed, giver: 0 });
        const gift = gifts.filter(gift => gift.fullName === data.currentEl);
        setGivenMessage(
          gift[0].description.length > 100
            ? gift[0].description.substring(0, 100) + "..."
            : gift[0].description
        );
        giverPast.push(data.currentEl);
        setGiven(gift[0]);
      }
    }
  };

  const handleTaker = data => {
    setTaken(null);
    if (control.stop) setSpeed({ ...speed, taker: speed.taker + 10 });
    if (given && given.fullName !== data.currentEl && speed.taker >= 150) {
      if (!similar(takerPast, data.currentEl)) {
        return;
      } else {
        setSpeed({ ...speed, taker: 0 });
        const gift = gifts.filter(gift => gift.fullName === data.currentEl);
        setControl({ ...control, start: false, finish: true });
        takerPast.push(data.currentEl);
        setTaken(gift[0]);
      }
    }
  };

  const updateStatus = () => {
    if (given && taken) {
      axios
        .post("/gift/update/given", {
          id: given.id,
          uid: taken.uid,
          fullName: taken.fullName
        })
        .then(() => {
          axios
            .post("/gift/update/taken", {
              id: taken.id,
              uid: given.uid,
              fullName: given.fullName
            })
            .then(() => {
              setGiver(giver.filter(give => give !== given.fullName));
              setTaker(taker.filter(taker => taker !== taken.fullName));
              setControl({ ...control, success: true });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  };

  // textLoop2

  const handleGiver2 = data => {
    setGiven2(null);
    if (control2.stop) setSpeed2({ ...speed2, giver: speed2.giver + 10 });
    if (speed2.giver >= 125) setControl3({ ...control3, stop: true });
    if (taken && speed2.giver >= 150) {
      if (!similar(giverPast, data.currentEl)) {
        return;
      } else {
        setSpeed2({ ...speed2, giver: 0 });

        const gift = gifts.filter(gift => gift.fullName === data.currentEl);

        giverPast.push(data.currentEl);
        setGivenMessage2(
          gift[0].description.length > 100
            ? gift[0].description.substring(0, 100) + "..."
            : gift[0].description
        );
        setGiven2(gift[0]);
      }
    }
  };

  const handleTaker2 = data => {
    setTaken2(null);
    if (control2.stop) setSpeed2({ ...speed2, taker: speed2.taker + 10 });
    if (given2 && given2.fullName !== data.currentEl && speed2.taker >= 150) {
      if (!similar(takerPast, data.currentEl)) {
        return;
      } else {
        setSpeed2({ ...speed2, taker: 0 });
        const gift = gifts.filter(gift => gift.fullName === data.currentEl);
        takerPast.push(data.currentEl);
        setControl2({ ...control2, start: false, finish: true });
        setTaken2(gift[0]);
      }
    }
  };

  const updateStatus2 = () => {
    if (given2 && taken2) {
      axios
        .post("/gift/update/given", {
          id: given2.id,
          uid: taken2.uid,
          fullName: taken2.fullName
        })
        .then(() => {
          axios
            .post("/gift/update/taken", {
              id: taken2.id,
              uid: given2.uid,
              fullName: given2.fullName
            })
            .then(() => {
              setGiver(giver.filter(give => give !== given2.fullName));
              setTaker(taker.filter(taker => taker !== taken2.fullName));
              setControl2({ ...control2, success: true });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  };

  // textLoop3

  const handleGiver3 = data => {
    setGiven3(null);
    if (control3.stop) setSpeed3({ ...speed3, giver: speed3.giver + 10 });
    if (speed3.giver >= 125) setControl4({ ...control4, stop: true });
    if (taken2 && speed3.giver >= 150) {
      if (!similar(giverPast, data.currentEl)) {
        return;
      } else {
        setSpeed3({ ...speed3, giver: 0 });
        const gift = gifts.filter(gift => gift.fullName === data.currentEl);
        giverPast.push(data.currentEl);
        setGivenMessage3(
          gift[0].description.length > 100
            ? gift[0].description.substring(0, 100) + "..."
            : gift[0].description
        );
        setGiven3(gift[0]);
      }
    }
  };

  const handleTaker3 = data => {
    setTaken3(null);
    if (control3.stop) setSpeed3({ ...speed3, taker: speed3.taker + 10 });
    if (given3 && given3.fullName !== data.currentEl && speed3.taker >= 150) {
      if (!similar(takerPast, data.currentEl)) {
        return;
      } else {
        setSpeed3({ ...speed3, taker: 0 });
        const gift = gifts.filter(gift => gift.fullName === data.currentEl);
        takerPast.push(data.currentEl);
        setControl3({ ...control3, start: false, finish: true });
        setTaken3(gift[0]);
      }
    }
  };

  const updateStatus3 = () => {
    if (given3 && taken3) {
      axios
        .post("/gift/update/given", {
          id: given3.id,
          uid: taken3.uid,
          fullName: taken3.fullName
        })
        .then(() => {
          axios
            .post("/gift/update/taken", {
              id: taken3.id,
              uid: given3.uid,
              fullName: given3.fullName
            })
            .then(() => {
              setGiver(giver.filter(give => give !== given3.fullName));
              setTaker(taker.filter(taker => taker !== taken3.fullName));
              setControl3({ ...control3, success: true });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  };

  // textLoop4

  const handleGiver4 = data => {
    setGiven4(null);
    if (control4.stop) setSpeed4({ ...speed4, giver: speed4.giver + 10 });
    if (speed4.giver >= 125) setControl5({ ...control5, stop: true });
    if (taken3 && speed4.giver >= 150) {
      if (!similar(giverPast, data.currentEl)) {
        return;
      } else {
        setSpeed4({ ...speed4, giver: 0 });
        const gift = gifts.filter(gift => gift.fullName === data.currentEl);
        giverPast.push(data.currentEl);
        setGivenMessage4(
          gift[0].description.length > 100
            ? gift[0].description.substring(0, 100) + "..."
            : gift[0].description
        );
        setGiven4(gift[0]);
      }
    }
  };

  const handleTaker4 = data => {
    setTaken4(null);
    if (control4.stop) setSpeed4({ ...speed4, taker: speed4.taker + 10 });
    if (given4 && given4.fullName !== data.currentEl && speed4.taker >= 150) {
      if (!similar(takerPast, data.currentEl)) {
        return;
      } else {
        setSpeed4({ ...speed4, taker: 0 });
        const gift = gifts.filter(gift => gift.fullName === data.currentEl);
        takerPast.push(data.currentEl);
        setControl4({ ...control4, start: false, finish: true });
        setTaken4(gift[0]);
      }
    }
  };

  const updateStatus4 = () => {
    if (given4 && taken4) {
      axios
        .post("/gift/update/given", {
          id: given4.id,
          uid: taken4.uid,
          fullName: taken4.fullName
        })
        .then(() => {
          axios
            .post("/gift/update/taken", {
              id: taken4.id,
              uid: given4.uid,
              fullName: given4.fullName
            })
            .then(() => {
              setGiver(giver.filter(give => give !== given4.fullName));
              setTaker(taker.filter(taker => taker !== taken4.fullName));
              setControl4({ ...control4, success: true });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  };

  // textLoop5

  const handleGiver5 = data => {
    setGiven5(null);
    if (control5.stop) setSpeed5({ ...speed5, giver: speed5.giver + 10 });
    if (taken4 && speed5.giver >= 150) {
      if (!similar(giverPast, data.currentEl)) {
        return;
      } else {
        setSpeed5({ ...speed5, giver: 0 });
        const gift = gifts.filter(gift => gift.fullName === data.currentEl);
        giverPast.push(data.currentEl);
        setGivenMessage5(
          gift[0].description.length > 100
            ? gift[0].description.substring(0, 100) + "..."
            : gift[0].description
        );
        setGiven5(gift[0]);
      }
    }
  };

  const handleTaker5 = data => {
    setTaken5(null);
    if (control5.stop) setSpeed5({ ...speed5, taker: speed5.taker + 10 });
    if (given5 && given5.fullName !== data.currentEl && speed5.taker >= 150) {
      if (!similar(takerPast, data.currentEl)) {
        return;
      } else {
        setSpeed5({ ...speed5, taker: 0 });
        const gift = gifts.filter(gift => gift.fullName === data.currentEl);
        takerPast.push(data.currentEl);
        setControl5({ ...control5, start: false, finish: true });
        setTaken5(gift[0]);
      }
    }
  };

  const updateStatus5 = () => {
    if (given5 && taken5) {
      axios
        .post("/gift/update/given", {
          id: given5.id,
          uid: taken5.uid,
          fullName: taken5.fullName
        })
        .then(() => {
          axios
            .post("/gift/update/taken", {
              id: taken5.id,
              uid: given5.uid,
              fullName: given5.fullName
            })
            .then(() => {
              setGiver(giver.filter(give => give !== given5.fullName));
              setTaker(taker.filter(taker => taker !== taken5.fullName));
              setControl5({ ...control5, success: true });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  };

  const startSpinner = () => {
    if (first) {
      setGiver(shuffle(giver.filter(give => give !== " ")));
      setTaker(shuffle(taker.filter(taker => taker !== " ")));
      setFirst(false);
    } else {
      setGiver(shuffle(giver));
      setTaker(shuffle(taker));
    }

    setGiverPast([]);
    setTakerPast([]);

    setSpeed({ ...speed, giver: 50, taker: 50 });
    setSpeed2({ ...speed2, giver: 50, taker: 50 });
    setSpeed3({ ...speed3, giver: 50, taker: 50 });
    setSpeed4({ ...speed4, giver: 50, taker: 50 });
    setSpeed5({ ...speed5, giver: 50, taker: 50 });

    setControl({
      ...control,
      start: true,
      stop: false,
      finish: false,
      success: false
    });
    setControl2({
      ...control2,
      start: true,
      stop: false,
      finish: false,
      success: false,
      active: first ? giver.length > 2 : giver.length > 1
    });
    setControl3({
      ...control3,
      start: true,
      stop: false,
      finish: false,
      success: false,
      active: first ? giver.length > 3 : giver.length > 2
    });
    setControl4({
      ...control4,
      start: true,
      stop: false,
      finish: false,
      success: false,
      active: first ? giver.length > 4 : giver.length > 3
    });
    setControl5({
      ...control5,
      start: true,
      stop: false,
      finish: false,
      success: false,
      active: first ? giver.length > 5 : giver.length > 4
    });
  };

  const loadingInput = (
    <div className="request-form pt-5" style={{ height: "300px" }}>
      <h2>Đang tải..</h2>
      <div className="d-flex justify-content-center">
        <div
          className="spinner-grow text-secondary"
          role="status"
          style={{ marginTop: "5%", width: "3rem", height: "3rem" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );

  // textLoop1

  const giverLoop = (
    <div className="col-5 mt-5 mb-lg-3">
      <h2>
        <TextLoop
          name="giver"
          interval={parseInt(speed.giver)}
          children={giver}
          onChange={handleGiver}
          className="ml-lg-3 ml-md-3"
        />
      </h2>
      <h6 className="ml-lg-3 ml-md-3 mt-lg-4">
        {control.finish && givenMessage}
      </h6>
    </div>
  );

  const takerLoop = (
    <div className="col-5 mt-5 mb-lg-3">
      <h2>
        <TextLoop
          name="taker"
          interval={parseInt(speed.taker)}
          children={taker}
          onChange={handleTaker}
          className="ml-lg-3 ml-md-3"
        />
      </h2>
    </div>
  );

  const textLoop = (
    <div className="form-group">
      {giver.length > 1 && taker.length > 1 && (
        <div className="row text-input">
          {giverLoop}
          {!first && (
            <div className="col-1 mt-5 mb-lg-3">
              <h2>
                <i className="fa fa-arrow-right"></i>
              </h2>
            </div>
          )}
          {takerLoop}
          <div className="col-1 text-center mt-5 mb-lg-3">
            {control.finish && given && taken && (
              <button
                style={{ height: "50px" }}
                className={
                  control.success ? "btn btn-success" : "btn btn-secondary"
                }
                onClick={updateStatus}
              >
                <strong>
                  <i className="fa fa-check"></i>
                </strong>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // textLoop2

  const giverLoop2 = (
    <div className="col-5 mb-lg-3">
      <h2>
        <TextLoop
          name="giver"
          interval={speed2.giver}
          children={giver}
          onChange={handleGiver2}
          className="ml-lg-3 ml-md-3"
        />
      </h2>
      <h6 className="ml-lg-3 ml-md-3 mt-lg-4">
        {control2.finish && givenMessage2}
      </h6>
    </div>
  );

  const takerLoop2 = (
    <div className="col-5 mb-lg-3">
      <h2>
        <TextLoop
          name="taker"
          interval={speed2.taker}
          children={taker}
          onChange={handleTaker2}
          className="ml-lg-3 ml-md-3"
        />
      </h2>
    </div>
  );

  const textLoop2 = (
    <div className="form-group">
      {giver.length > 1 && taker.length > 1 && (
        <div className="row text-input">
          {giverLoop2}
          {!first && (
            <div className="col-1 mb-lg-3">
              <h2>
                <i className="fa fa-arrow-right"></i>
              </h2>
            </div>
          )}
          {takerLoop2}
          <div className="col-1 text-center mb-lg-3">
            {control2.finish && given2 && taken2 && (
              <button
                style={{ height: "50px" }}
                className={
                  control2.success ? "btn btn-success" : "btn btn-secondary"
                }
                onClick={updateStatus2}
              >
                <strong>
                  <i className="fa fa-check"></i>
                </strong>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // textLoop3

  const giverLoop3 = (
    <div className="col-5 mb-lg-3">
      <h2>
        <TextLoop
          name="giver"
          interval={speed3.giver}
          children={giver}
          onChange={handleGiver3}
          className="ml-lg-3 ml-md-3"
        />
      </h2>
      <h6 className="ml-lg-3 ml-md-3 mt-lg-4">
        {control3.finish && givenMessage3}
      </h6>
    </div>
  );

  const takerLoop3 = (
    <div className="col-5 mb-lg-3">
      <h2>
        <TextLoop
          name="taker"
          interval={speed3.taker}
          children={taker}
          onChange={handleTaker3}
          className="ml-lg-3 ml-md-3"
        />
      </h2>
    </div>
  );

  const textLoop3 = (
    <div className="form-group">
      {giver.length > 1 && taker.length > 1 && (
        <div className="row text-input">
          {giverLoop3}
          {!first && (
            <div className="col-1 mb-lg-3">
              <h2>
                <i className="fa fa-arrow-right"></i>
              </h2>
            </div>
          )}
          {takerLoop3}
          <div className="col-1 text-center mb-lg-3">
            {control3.finish && given3 && taken3 && (
              <button
                style={{ height: "50px" }}
                className={
                  control3.success ? "btn btn-success" : "btn btn-secondary"
                }
                onClick={updateStatus3}
              >
                <strong>
                  <i className="fa fa-check"></i>
                </strong>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // textLoop4

  const giverLoop4 = (
    <div className="col-5 mb-lg-3">
      <h2>
        <TextLoop
          name="giver"
          interval={speed4.giver}
          children={giver}
          onChange={handleGiver4}
          className="ml-lg-3 ml-md-3"
        />
      </h2>
      <h6 className="ml-lg-3 ml-md-3 mt-lg-4">
        {control4.finish && givenMessage4}
      </h6>
    </div>
  );

  const takerLoop4 = (
    <div className="col-5 mb-lg-3">
      <h2>
        <TextLoop
          name="taker"
          interval={speed4.taker}
          children={taker}
          onChange={handleTaker4}
          className="ml-lg-3 ml-md-3"
        />
      </h2>
    </div>
  );

  const textLoop4 = (
    <div className="form-group">
      {giver.length > 3 && taker.length > 3 && (
        <div className="row text-input">
          {giverLoop4}
          {!first && (
            <div className="col-1 mb-lg-3">
              <h2>
                <i className="fa fa-arrow-right"></i>
              </h2>
            </div>
          )}
          {takerLoop4}
          <div className="col-1 text-center mb-lg-3">
            {control4.finish && given4 && taken4 && (
              <button
                style={{ height: "50px" }}
                className={
                  control4.success ? "btn btn-success" : "btn btn-secondary"
                }
                onClick={updateStatus4}
              >
                <strong>
                  <i className="fa fa-check"></i>
                </strong>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // textLoop5

  const giverLoop5 = (
    <div className="col-5 mb-lg-3">
      <h2>
        <TextLoop
          name="giver"
          interval={speed5.giver}
          children={giver}
          onChange={handleGiver5}
          className="ml-lg-3 ml-md-3"
        />
      </h2>
      <h6 className="ml-lg-3 ml-md-3 mt-lg-4">
        {control5.finish && givenMessage5}
      </h6>
    </div>
  );

  const takerLoop5 = (
    <div className="col-5 mb-lg-3">
      <h2>
        <TextLoop
          name="taker"
          interval={speed5.taker}
          children={taker}
          onChange={handleTaker5}
          className="ml-lg-3 ml-md-3"
        />
      </h2>
    </div>
  );

  const textLoop5 = (
    <div className="form-group">
      {giver.length > 4 && taker.length > 4 && (
        <div className="row text-input">
          {giverLoop5}
          {!first && (
            <div className="col-1 mb-lg-3">
              <h2>
                <i className="fa fa-arrow-right"></i>
              </h2>
            </div>
          )}
          {takerLoop5}
          <div className="col-1 text-center mb-lg-3">
            {control5.finish && given5 && taken5 && (
              <button
                style={{ height: "50px" }}
                className={
                  control5.success ? "btn btn-success" : "btn btn-secondary"
                }
                onClick={updateStatus5}
              >
                <strong>
                  <i className="fa fa-check"></i>
                </strong>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const spinnerInput = (
    <div className="request-form">
      <div className="form-group text-right">
        <p className="d-inline ml-3">
          <em>Phần quà còn lại: </em>
        </p>
        <h2 className="d-inline ml-3 mr-3">
          {first ? giver.length - 1 : giver.length}
        </h2>
      </div>

      {textLoop}
      {control2.active && textLoop2}
      {control3.active && textLoop3}
      {control4.active && textLoop4}
      {control5.active && textLoop5}

      {!first && giver.length === 1 && (
        <div className="form-group">
          <div className="row text-input">
            <div className="col-5 mt-5 mb-lg-3">
              <h2>{giver[0]}</h2>
              <h6 className="ml-lg-3 ml-md-3 mt-lg-4">
                {control.finish && givenMessage}
              </h6>
            </div>
            <div className="col-1 mt-5 mb-lg-3">
              <h2>
                <i className="fa fa-arrow-right"></i>
              </h2>
            </div>
            <div className="col-5 mt-5 mb-lg-3">
              <h2>{taker[0]}</h2>
              <h6 className="ml-lg-3 ml-md-3 mt-lg-4">
                {control.finish && givenMessage}
              </h6>
            </div>
            <div className="col-1 text-center mt-5 mb-lg-3">
              {control.finish && given && taken && (
                <button
                  style={{ height: "50px" }}
                  className={
                    control.success ? "btn btn-success" : "btn btn-secondary"
                  }
                  onClick={updateStatus}
                >
                  <strong>
                    <i className="fa fa-check"></i>
                  </strong>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="form-group spinner">
        {!control.start && control.finish && (
          <button onClick={startSpinner} className="btn btn-danger py-3 px-4">
            <strong>Quay may mắn</strong>
          </button>
        )}
        {control.start && (
          <button
            onClick={() => {
              setControl({ ...control, stop: true });
            }}
            className="btn btn-danger mt-5 py-3 px-4"
            disabled={control.stop}
          >
            <strong>Dừng quay</strong>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <img
        src="/images/christmas-background.jpg"
        className="background"
        alt="background"
      />
      <div className="hero-wrap container">
        <div className="row slider-text align-items-center">
          <div className="col-12">
            {loading && loadingInput}
            {!loading && spinnerInput}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pairing;
