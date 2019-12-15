import React, { useContext, useState } from "react";
import { ManagerContext } from "../../contexts/manager";
import axios from "axios";

function Manager(props) {
  const context = useContext(ManagerContext);
  const [values, setManager] = useState({
    username: "",
    password: ""
  });
  const [message, setMessage] = useState();

  const handleInput = event => {
    setManager({ ...values, [event.target.name]: event.target.value });
  };

  const signIn = event => {
    event.preventDefault();
    axios
      .post("/manager", {
        username: values.username,
        password: values.password
      })
      .then(res => {
        if (res && res.data) {
          context.signIn(res.data);
        } else setMessage("user not found");
      })
      .catch(() => setMessage("Đăng nhập lỗi"));
  };

  const managerInput = (
    <form onSubmit={signIn} className="request-form">
      <h2>Đăng nhập</h2>
      <div className="form-group mt-5">
        <input
          name="username"
          value={values.username}
          type="text"
          onChange={handleInput}
          className="form-control"
          placeholder="Tài khoản *"
          required
        />
      </div>
      <div className="form-group mt-5">
        <input
          name="password"
          value={values.password}
          type="password"
          onChange={handleInput}
          className="form-control"
          placeholder="Mật khẩu *"
          required
        />
      </div>
      <div className="form-group text-right">
        <label className="mr-2">
          <em>{message}</em>
        </label>
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Đăng nhập"
          className="btn btn-primary py-3 px-4"
        />
      </div>
    </form>
  );

  const optionsInput = (
    <div className="request-form">
      <h2>Quản lý</h2>
      <div className="form-group mt-5">
        <button
          onClick={() => props.history.push("/root/scanner")}
          className="btn btn-light py-3 px-4"
        >
          <strong>Quét điểm danh</strong>
        </button>
      </div>
      <div className="form-group mt-4">
        <button
          onClick={() => props.history.push("/root/giver")}
          className="btn btn-light py-3 px-4"
        >
          <strong>Quét trao quà</strong>
        </button>
      </div>
      <div className="form-group mt-4">
        <button
          onClick={() => props.history.push("/root/lucky-number")}
          className="btn btn-light py-3 px-4"
          disabled={context.manager && context.manager.permission.type !== 0}
        >
          <strong>Quay may mắn</strong>
        </button>
      </div>
    </div>
  );

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
            {!context.manager && managerInput}
            {context.manager && optionsInput}
          </div>
          <div className="col-xl-3 col-lg-3 col-md-1" />
        </div>
      </div>
    </div>
  );
}

export default Manager;
