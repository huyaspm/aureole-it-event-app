import React, { useState, useEffect, useContext } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";
import { ManagerContext } from "../../contexts/manager";

function Checker(props) {
  const context = useContext(ManagerContext);
  const [code, setCode] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    if (code) {
      if (Object.values(code).length === 10) {
        checkCode(code);
        setCode("");
      } else if (Object.values(code).length > 10) {
        setCode("");
        setMessage("Mã tham dự không đúng");
      }
    }
  }, [code]);

  const checkCode = code => {
    axios
      .post("/manager/scan", {
        ticketCode: code
      })
      .then(res => {
        setMessage(res.data.fullName + ", " + res.data.email);
      })
      .catch(err => {
        if (err && err.response.status === 401) setMessage("Đã quét mã này");
        if (err && err.response.status === 400) setMessage("Không tìm thấy mã");
      });
  };

  const handleScan = data => {
    if (data) setCode(data);
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
              <h2>Quét điểm danh</h2>
              <div className="form-group mt-5">
                <QrReader
                  delay={1000}
                  onScan={handleScan}
                  className="img-fluid"
                  onError={handleError}
                  facingMode="environment"
                  showViewFinder={false}
                />
              </div>
              <div className="form-group mt-4">
                <p>
                  <input
                    name="code"
                    className="form-control"
                    value={code}
                    onChange={handleInput}
                    placeholder="Mã tham dự *"
                  />
                </p>
              </div>
              <div className="form-group text-right">
                <label className="mr-2">
                  <strong>{message}</strong>
                </label>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-1" />
        </div>
      </div>
    </div>
  );
}

export default Checker;
