import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ManagerContext } from "../../contexts/manager";

function EmailChecker(props) {
  useContext(ManagerContext);

  const [values, setValues] = useState({
    message: "",
    email: "",
    luckyNumber: ""
  });

  const handleInput = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const emailChecked = () => {
    const email = values.email + "@ait.com";
    const re = /^[a-z][a-z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    if (email.trim() === "" || !email.match(re)) {
      setValues({ ...values, message: "Hãy nhập đúng email" });
    } else {
      setValues({ ...values, message: "Đang kiểm tra, chờ xí.." });
      axios
        .post("/manager/scan/email", {
          email: email
        })
        .then(res => {
          setValues({
            ...values,
            message: res.data.email,
            luckyNumber: res.data.gifts.luckyNumber
          });
        })
        .catch(err => {
          setValues({ ...values, message: "Có lỗi xảy ra, xin thử lại.." });
        });
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
                <h2 className="ml-4">Email</h2>
              </div>
              <div className="form-group mt-5">
                <div className="input-group">
                  <input
                    onChange={handleInput}
                    name="email"
                    value={values.email}
                    type="text"
                    className="form-control"
                    placeholder="Email *"
                    aria-label="email"
                    aria-describedby="email"
                    required
                  />
                  <div className="input-group-append">
                    <span className="input-group-text" id="email">
                      @ait.com
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-group text-right mt-4">
                <label className="mr-2">
                  <strong>{values.message}</strong>
                </label>
              </div>
              <div className="form-group mt-4">
                <label>
                  Số may mắn:{" "}
                  <strong className="ml-3" style={{ fontSize: "28px" }}>
                    {values.luckyNumber}
                  </strong>
                </label>
              </div>
              <div className="form-group mt-4">
                <button
                  onClick={emailChecked}
                  className="btn btn-primary py-3 px-4"
                >
                  Điểm danh
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

export default EmailChecker;
