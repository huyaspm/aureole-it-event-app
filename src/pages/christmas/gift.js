import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";

import { UserContext } from "../../contexts/user";
import Layout from "./layout";

function Gift(props) {
  const { auth, user, updateUser, signOut, syncing } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [mount, setMount] = useState(false);
  const [update, setUpdate] = useState(false);
  const updateRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (!auth) props.history.push("/sign-in");
    }, 3000);
  });

  useEffect(() => {
    if (!syncing && user) {
      if (!mount) {
        setValues({
          ...values,
          fullName: user.fullName,
          description: user.description
        });
      }
      setMount(true);
    }
  });

  const [values, setValues] = useState({
    message: "",
    fullName: "",
    description: ""
  });

  const createDetail = event => {
    event.preventDefault();
    setValues({ ...values, message: "Đang đăng ký, chờ xíu.." });
    axios
      .post("/gift/create", {
        uid: auth.uid,
        fullName: values.fullName,
        phoneNumber: auth.phoneNumber,
        description: values.description
      })
      .then(res => {
        setValues({ ...values, message: "Đăng ký thành công" });
        updateUser(res.data);
      })
      .catch(err => {
        return setValues({ ...values, message: "Hãy nhập đúng thông tin" });
      });
  };

  const updateDetail = event => {
    event.preventDefault();
    setValues({ ...values, message: "Đang cập nhật, chờ xíu.." });
    if (
      values.fullName === user.fullName &&
      values.description === user.description
    ) {
      setValues({ ...values, message: "Giữ nguyên thông tin" });
      setUpdate(false);
    } else {
      axios
        .post("/gift/update", {
          id: user.id,
          fullName: values.fullName,
          description: values.description
        })
        .then(res => {
          updateUser(res.data);
          setValues({ ...values, message: "Cập nhật thành công" });
          setUpdate(false);
        })
        .catch(() => {
          return setValues({ ...values, message: "Hãy nhập đúng thông tin" });
        });
    }
  };

  const handleInput = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const detailInput = (
    <form onSubmit={createDetail} className="request-form">
      <div className="d-flex mt-2 back-button">
        <div onClick={() => props.history.push("/")} className="btn btn-light">
          <i className="fa fa-arrow-left" />
        </div>
        <h2 className="ml-4">Đăng ký trao quà</h2>
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
        <input
          onChange={handleInput}
          name="description"
          value={values.description}
          type="text"
          className="form-control"
          placeholder="Lời chúc của bạn"
          aria-label="description"
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
          value="Đăng ký"
          className="btn btn-danger py-3 px-4"
        />
      </div>
      <div className="form-group mt-4">
        <button
          className="btn btn-light py-3 px-4"
          onClick={() => {
            signOut();
            props.history.push("/sign-in");
          }}
        >
          Đăng xuất
        </button>
      </div>
    </form>
  );

  const updateInput = (
    <form onSubmit={updateDetail} className="request-form">
      <div className="d-flex mt-2 back-button">
        <div onClick={() => props.history.push("/")} className="btn btn-light">
          <i className="fa fa-arrow-left" />
        </div>
        <h2 className="ml-4">Đăng ký thành công</h2>
      </div>
      <div className="form-group mt-5">
        <input
          name="fullName"
          ref={updateRef}
          value={values.fullName}
          type="text"
          onChange={handleInput}
          className="form-control"
          aria-label="fullName"
          placeholder="Họ và Tên *"
          readOnly={!update}
          required
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleInput}
          name="description"
          value={values.description}
          type="text"
          className="form-control"
          placeholder="Lời chúc của bạn"
          aria-label="description"
          readOnly={!update}
        />
      </div>
      <div className="form-group text-right">
        <label className="mr-2">
          <em>{values.message}</em>
        </label>
      </div>
      {user && update && (
        <div className="form-group">
          <button type="submit" className="btn btn-danger py-3 px-4">
            Cập nhật
          </button>
        </div>
      )}
      {user && !update && (
        <div className="form-group">
          <button
            onClick={() => {
              setUpdate(true);
              setValues({ ...values, message: "" });
              updateRef.current.focus();
            }}
            className="btn btn-light py-3 px-4"
          >
            Thay đổi thông tin
          </button>
        </div>
      )}
      <div className="form-group mt-4">
        <div
          className="btn btn-light py-3 px-4"
          onClick={() => {
            signOut();
            props.history.push("/sign-in");
          }}
        >
          Đăng xuất
        </div>
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
      {loading && loadingInput}
      {!loading && auth && !user && detailInput}
      {!loading && auth && user && updateInput}
    </Layout>
  );
}

export default Gift;
