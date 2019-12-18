import React, { useState, useContext, useEffect, useRef } from "react";
import firebase from "../../config/firebase-config";

import { UserContext } from "../../contexts/user";
import Layout from "./layout";

function Signin(props) {
  const { auth, user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const recaptchaWrapperRef = useRef()

  const [values, setValues] = useState({
    message: "Xác thực để lấy mã tham dự",
    confirmCode: "",
    phoneNumber: "",
    confirmResult: null
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const signIn = event => {
    event.preventDefault();
    // firebase.auth().settings.appVerificationDisabledForTesting = true;
    setValues({ ...values, message: "Đang gửi mã xác thực.." });
    const appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" }
    );
    const phoneNumber = "+84" + values.phoneNumber;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(confirmResult =>
        setValues({ ...values, confirmResult, message: "Nhập mã xác thực" })
      )
      .catch(err => {
        appVerifier.clear();
        recaptchaWrapperRef.current.innerHTML = '<div id="recaptcha-container" />'
        setValues({ ...values, message: "Hãy nhập đúng số điện thoại" });
      });
  };

  const confirmCode = event => {
    event.preventDefault();
    setValues({ ...values, message: "Đang xác thực.." });
    if (values.confirmCode.length && values.confirmResult) {
      values.confirmResult
        .confirm(values.confirmCode)
        .then(() => setValues({ ...values, message: "Xác thực thành công" }))
        .catch(() => setValues({ ...values, message: "Sai mã xác thực" }));
    }
  };

  const handleInput = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const phoneInput = (
    <form onSubmit={signIn} className="request-form">
      <h2>Đăng ký ngay</h2>
      <div className="form-group mt-5">
        <div className="input-group">
          <div className="input-group-append">
            <span className="input-group-text mr-2" id="phone-number">
              +84
            </span>
          </div>
          <input
            name="phoneNumber"
            type="number"
            className="form-control"
            placeholder="Điện thoại *"
            required
            aria-describedby="phone-number"
            onChange={handleInput}
            value={values.phoneNumber}
          />
        </div>
      </div>
      <div className="form-group text-right">
        <label className="mr-2">
          <em>{values.message}</em>
        </label>
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Đăng ký"
          className="btn btn-danger py-3 px-4"
        />
      </div>
      <div className="form-group text-center"></div>
    </form>
  );

  const verifyInput = (
    <form onSubmit={confirmCode} className="request-form">
      <h2>Xác thực</h2>
      <div className="form-group mt-5">
        <input
          name="confirmCode"
          type="number"
          className="form-control"
          placeholder="Mã xác thực *"
          required
          onChange={handleInput}
          value={values.confirmCode}
        />
      </div>
      <div className="form-group text-right">
        <label className="mr-2">
          <em>{values.message}</em>
        </label>
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Xác thực"
          className="btn btn-danger py-3 px-4"
        />
      </div>
      <div className="form-group text-center"></div>
    </form>
  );

  const loadingInput = (
    <div className="request-form" style={{ height: "350px" }}>
      <h2>Đang tải..</h2>
      <div className="d-flex justify-content-center">
        <div
          className="spinner-grow text-secondary"
          role="status"
          style={{ marginTop: "30%", width: "3rem", height: "3rem" }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      {!loading && auth && props.history.push("/christmas-gifts")}
      {loading && loadingInput}
      <div ref={recaptchaWrapperRef}>
        <div id="recaptcha-container" />
      </div>
      {!loading && !values.user && !values.confirmResult && phoneInput}
      {!loading && !values.user && values.confirmResult && verifyInput}
    </Layout>
  );
}

export default Signin;
