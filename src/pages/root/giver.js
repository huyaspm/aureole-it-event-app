import React, { useState, useEffect, useContext } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";
import { ManagerContext } from "../../contexts/manager";

function Giver(props) {
  const context = useContext(ManagerContext);
  const [code, setCode] = useState();
  const [message, setMessage] = useState();
  const [giving, setGiving] = useState(false);
  const [gifts, setGifts] = useState({
    uid: "",
    gift: "",
    luckyMoney: ""
  });

  useEffect(() => {
    if (code && !giving) {
      if (Object.values(code).length === 10) {
        checkCode(code);
        setGiving(true);
      } else if (Object.values(code).length > 10) {
        setCode("");
        setMessage("Mã tham dự không đúng");
      }
    }
  }, [code]);

  const checkCode = code => {
    axios
      .post("/manager/give", {
        ticketCode: code
      })
      .then(res => {
        setMessage(res.data.fullName + ", " + res.data.email);
        setGifts({
          ...gifts,
          uid: res.data.uid,
          gift: res.data.gifts.gift,
          luckyMoney: res.data.gifts.luckyMoney
        });
      })
      .catch(err => {
        if (err.response.status === 400) setMessage("Không tìm thấy mã");
        if (err.response.status === 401) setMessage("Đã trao quà cho mã này");
        if (err.response.status === 402)
          setMessage("Mã này chưa quét tham gia");
      });
  };

  const givingGifts = () => {
    axios
      .post("/manager/gift", {
        uid: gifts.uid
      })
      .then(() => {
        setMessage("Trao quà thành công");
        setGiving(false);
        setCode("");
        setGifts({
          uid: "",
          gift: "",
          luckyMoney: ""
        });
      })
      .catch(() => {
        setMessage("Có lỗi xảy ra, xin thử lại");
      });
  };

  const handleScan = data => {
    if (data && !giving) setCode(data);
  };

  const handleInput = event => setCode(event.target.value);

  const handleError = error => {
    if (error) setMessage("Không tìm thấy camera");
  };

  return (
    <div>
      {!context.manager && props.history.push("/root")}
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
              <h2>Quét trao quà</h2>
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
              <div className="form-group mt-4">
                <p>
                  <input
                    name="code"
                    className="form-control"
                    value={code}
                    onChange={handleInput}
                    placeholder="Mã trao quà *"
                    readOnly={giving}
                  />
                </p>
              </div>
              <div className="form-group text-right">
                <label className="mr-2">
                  <strong>{message}</strong>
                </label>
              </div>
              <div className="form-group mt-4">
                <label>
                  Quà: <strong>{gifts.gift}</strong>
                </label>
              </div>
              <div className="form-group">
                <label>
                  Lì xì: <strong>{gifts.luckyMoney}</strong>
                </label>
              </div>
              <div className="form-group">
                {gifts.uid && (
                  <button
                    onClick={givingGifts}
                    className="btn btn-primary py-3 px-4"
                  >
                    Trao quà
                  </button>
                )}
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
