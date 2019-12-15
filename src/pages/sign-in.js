import React, { useState, useContext } from "react";
import firebase from "../config/firebase-config";

import { UserContext } from "../contexts/user";
import Layout from "../components/layout";

function Signin(props) {
  const { auth } = useContext(UserContext);

  const [values, setValues] = useState({
    message: "Xác thực để lấy mã tham dự",
    confirmCode: "",
    phoneNumber: "",
    confirmResult: null
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
      .catch(() =>
        setValues({ ...values, message: "Hãy nhập đúng số điện thoại" })
      );
  };

  const confirmCode = event => {
    event.preventDefault();
    if (values.confirmCode.length && values.confirmResult) {
      values.confirmResult
        .confirm(values.confirmCode)
        .then(props.history.push("/"))
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
          className="btn btn-primary py-3 px-4"
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
          className="btn btn-primary py-3 px-4"
        />
      </div>
      <div className="form-group text-center"></div>
    </form>
  );

  return (
    <Layout>
      {auth && props.history.push('/update')}
      <div id="recaptcha-container" />
      {!values.user && !values.confirmResult && phoneInput}
      {!values.user && values.confirmResult && verifyInput}
    </Layout>
  );
}

export default Signin;
