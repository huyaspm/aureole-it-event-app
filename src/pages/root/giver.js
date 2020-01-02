import React, { useState, useEffect, useContext } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";
import { ManagerContext } from "../../contexts/manager";

function Giver(props) {
  useContext(ManagerContext);
  const [code, setCode] = useState();
  const [message, setMessage] = useState();
  const [giving, setGiving] = useState(false);
  const [checked, setChecked] = useState(["AIT-"]);
  const [gifts, setGifts] = useState({
    uid: "",
    gift: "",
  });

  useEffect(() => {
    if (code && !giving) {
      if (Object.values(code).length === 5) {
        checkCode("AIT-" + code);
      } else if (Object.values(code).length > 5) {
        setCode("");
        setMessage("Mã tham dự không đúng");
      }
    }
  }, [code]);

  const codeExist = code => {
    var result = false;
    checked.forEach(check => {
      if (code === check) result = true;
    });
    return result;
  };

  const checkCode = code => {
    setGiving(true);
    if (!codeExist(code)) {
      setChecked([...checked, code]);
      axios
        .post("/manager/give", {
          ticketCode: code
        })
        .then(res => {
          setMessage(res.data.fullName + ", " + res.data.email);
          setGifts({
            ...gifts,
            uid: res.data.uid,
            gift: res.data.gifts.set
          });
        })
        .catch(err => {
          if (err && err.response.status === 400)
            setMessage("Không tìm thấy mã");
          if (err && err.response.status === 401)
            setMessage("Đã trao quà cho mã này");
          if (err && err.response.status === 402)
            setMessage("Mã này chưa quét tham gia");
          setGiving(false);
          setCode("");
        });
    } else {
      setMessage("Đã quét mã này");
      setGiving(false);
      setCode("");
    }
  };

  const givingGifts = () => {
    setMessage("Đang trao quà..");
    axios
      .post("/manager/gift", {
        uid: gifts.uid
      })
      .then(() => {
        setMessage("Trao quà thành công");
        setGifts({
          uid: "",
          gift: ""
        });
      })
      .catch(() => {
        setMessage("Có lỗi xảy ra, xin thử lại");
      });
    setGiving(false);
    setCode("");
  };

  const handleScan = data => {
    if (data && !giving) setCode(data.split("-")[1]);
  };

  const handleInput = event => setCode(event.target.value);

  const handleError = error => {
    if (error) setMessage("Không tìm thấy camera");
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
          <div className="col-xl-3 col-lg-3 col-md-1" />
          <div className="col-xl-6 col-lg-6 col-md-10">
            <div className="request-form">
              <div className="d-flex mt-2 back-button">
                <button
                  onClick={() => props.history.goBack()}
                  className="btn btn-light"
                >
                  <i className="fa fa-arrow-left" />
                </button>
                <h2 className="ml-4">Quét trao quà</h2>
              </div>
              <div className="form-group mt-5">
                <QrReader
                  delay={1000}
                  onScan={handleScan}
                  className="img-fluid"
                  onError={handleError}
                  facingMode="environment"
                  showViewFinder={false}
                  readOnly={giving}
                />
              </div>
              <div className="input-group mt-4">
                <div className="input-group-append">
                  <span className="input-group-text mr-2" id="code">
                    AIT -
                  </span>
                </div>
                <input
                  name="code"
                  type="number"
                  className="form-control"
                  placeholder="Mã tham dự *"
                  required
                  readOnly={giving}
                  aria-describedby="code"
                  onChange={handleInput}
                  value={code}
                />
              </div>
              <div className="form-group text-right mt-4">
                <label className="mr-2">
                  <strong>{message}</strong>
                </label>
              </div>
              <div className="form-group mt-4">
                <label>
                  Set quà:{" "}
                  <strong className="ml-3" style={{ fontSize: "28px" }}>
                    {gifts.gift}
                  </strong>
                </label>
              </div>
              <div className="form-group">
                <button
                  onClick={givingGifts}
                  className="btn btn-primary py-3 px-4"
                  disabled={!gifts.uid}
                >
                  Trao quà
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-1" />
        </div>
      </div>
    </div>
  );
}

export default Giver;
