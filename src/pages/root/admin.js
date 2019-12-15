import React, { useContext, useState } from "react";
import { ManagerContext } from "../../contexts/manager";
import axios from "axios";

function Admin(props) {
  const context = useContext(ManagerContext);
  const [values, setValues] = useState({
    username: "",
    password: "",
    permission: "1"
  });
  const [message, setMessage] = useState();

  const createManager = event => {
    event.preventDefault();
    setMessage("Đang tạo, chờ xíu..");
    axios
      .post("/manager/create", {
        username: values.username,
        password: values.password,
        permission: values.permission
      })
      .then(() => {
        setMessage("Tạo tài khoản thành công");
        setValues({
          username: "",
          password: "",
          permission: "1"
        });
      })
      .catch(err => {
        if (err && err.response.status === 400)
          setMessage("Tài khoản đã tồn tại");
        else setMessage("Có lỗi xảy ra, xin thử lại");
      });
  };

  const handleInput = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSelect = event => {
    setValues({ ...values, permission: event.target.value });
  };

  return (
    <div>
      {context.manager.permission.type !== 0 && props.history.push("/root")}
      <img
        src="/images/background.jpg"
        className="background"
        alt="background"
      />
      <div className="hero-wrap container">
        <div className="row slider-text align-items-center">
          <div className="col-xl-3 col-lg-3 col-md-1" />
          <div className="col-xl-6 col-lg-6 col-md-10">
            <form onSubmit={createManager} className="request-form">
              <h2>Tạo tài khoản</h2>
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
              <div className="form-group">
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
              <div className="form-group mt-4">
                <label className="mr-4">Quyền truy câp:</label>
                <label class="radio-inline mr-4">
                  <input
                    type="radio"
                    className="mr-2"
                    checked={values.permission === "1"}
                    value="1"
                    onChange={handleSelect}
                    defaultChecked
                  />
                  Nhân viên
                </label>
                <label class="radio-inline">
                  <input
                    type="radio"
                    className="mr-2"
                    checked={values.permission === "0"}
                    value="0"
                    onChange={handleSelect}
                  />
                  Quản lý
                </label>
              </div>
              <div className="form-group text-right">
                <label className="mr-2">
                  <em>{message}</em>
                </label>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Tạo tài khoản"
                  className="btn btn-primary py-3 px-4"
                />
              </div>
            </form>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-1" />
        </div>
      </div>
    </div>
  );
}

export default Admin;
