import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import { UserContext } from "../contexts/user";
import Layout from "../components/layout";

function Update(props) {
  const { auth, user, updateUser, signOut } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  useEffect(() => {
    if (!mount) {
      if (auth && !user) {
        setMount(true);
        axios
          .post("/gift", {
            uid: auth.uid
          })
          .then(res => {
            if (res.data) setValues({ ...values, fullName: res.data.fullName });
          })
          .catch(err => console.log(err));
      }
    }
  });

  const [values, setValues] = useState({
    message: "Nhớ nhập đúng thông tin để có quà nhé",
    fullName: "",
    email: ""
  });

  const updateDetail = event => {
    event.preventDefault();
    setValues({ ...values, message: "Đang cập nhật, chờ xíu.." });
    const email = values.email + "@ait.com";
    axios
      .post("/register", {
        uid: auth.uid,
        email: email,
        fullName: values.fullName,
        phoneNumber: auth.phoneNumber
      })
      .then(res => {
        updateUser(res.data);
      })
      .catch(err => {
        if (err && err.response.status === 401)
          return setValues({ ...values, message: "Email đã đăng ký" });
        else
          return setValues({ ...values, message: "Hãy nhập đúng thông tin" });
      });
  };

  const handleInput = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const detailInput = (
    <form onSubmit={updateDetail} className="request-form">
      <div className="d-flex mt-2 back-button">
        <div
          onClick={() => props.history.push("/")}
          className="btn btn-light"
        >
          <i className="fa fa-arrow-left" />
        </div>
        <h2 className="ml-4">Cập nhật</h2>
      </div>
      <div className="form-group mt-5">
        <input
          name="fullName"
          value={values.fullName}
          type="text"
          onChange={handleInput}
          className="form-control"
          aria-label="fullName"
          placeholder="Họ và Tên *"
          required
        />
      </div>
      <div className="form-group">
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
      <div className="form-group text-right">
        <label className="mr-2">
          <em>{values.message}</em>
        </label>
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Cập nhật"
          className="btn btn-primary py-3 px-4"
        />
      </div>
      <div className="form-group mt-4 text-center">
        <label
          onClick={() => {
            signOut();
            props.history.push("/sign-in");
          }}
        >
          Đăng ký bằng số điện thoại khác
        </label>
      </div>
    </form>
  );

  const loadingInput = (
    <div className="request-form" style={{ height: "400px" }}>
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
      {!loading && auth && user && props.history.push("/yearend-party")}
      {loading && !auth && loadingInput}
      {auth && !user && detailInput}
    </Layout>
  );
}

export default Update;
