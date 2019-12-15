import React, { useContext, useEffect } from "react";
import axios from "axios";
import QRCode from "qrcode.react";

import Layout from "../components/layout";
import { UserContext } from "../contexts/user";

function Homepage(props) {
  const { auth, user, updateUser, signOut } = useContext(UserContext);

  useEffect(() => {
    if (user && !user.checked.checkedIn) {
      axios
        .post("/checked", {
          id: user.id
        })
        .then(res => {
          if (res && res.data) {
            updateUser(res.data);
          }
        });
    }
    if (user && user.checked.checkedIn && !user.gifts.taken) {
      axios
        .post("/taken", {
          id: user.id
        })
        .then(res => {
          if (res && res.data) {
            updateUser(res.data);
          }
        });
    }
  });

  const codeDetail = (
    <div className="request-form">
      <h2>Đã đăng ký</h2>
      <div className="form-group mt-5">
        <label>
          Tên: <strong>{user && user.fullName}</strong>
        </label>
      </div>
      <div className="form-group">
        <label>
          Email: <strong>{user && user.email}</strong>
        </label>
      </div>
      <div className="form-group">
        <label>
          Mã tham dự: <strong>{user && user.checked.ticketCode}</strong>
        </label>
      </div>
      <div className="form-group text-center mt-4">
        <QRCode
          className="img-fluid"
          value={user && user.checked && user.checked.ticketCode}
          level="H"
          size="256"
        ></QRCode>
      </div>
      <div className="form-group mt-4">
        <button
          onClick={() => {
            signOut();
            props.history.push("/sign-in");
          }}
          className="btn btn-primary py-3 px-4"
        >
          <strong>Đăng xuất</strong>
        </button>
      </div>
    </div>
  );

  const giftDetail = (
    <div className="request-form">
      <h2>Quà tham dự</h2>
      <div className="form-group mt-5">
        <label>
          Tên: <strong>{user && user.fullName}</strong>
        </label>
      </div>
      <div className="form-group">
        <label>
          Email: <strong>{user && user.email}</strong>
        </label>
      </div>
      <div className="form-group lucky-number">
        <label>
          Số may mắn: <strong>{user && user.gifts.luckyNumber}</strong>
        </label>
      </div>
      <div className="form-group">
        <label>
          Quà: <strong>{user && user.gifts.gift}</strong>
        </label>
      </div>
      <div className="form-group">
        <label>
          Lì xì: <strong>{user && user.gifts.luckyMoney}</strong>
        </label>
      </div>
      <div className="form-group">
        <label>
          Mã nhận quà: <strong>{user && user.checked.ticketCode}</strong>
        </label>
      </div>
      <div className="form-group text-center mt-4">
        <QRCode
          className="img-fluid"
          value={user && user.checked && user.checked.ticketCode}
          level="H"
          size="256"
        ></QRCode>
      </div>
      <div className="form-group mt-4">
        <button
          onClick={() => {
            signOut();
            props.history.push("/sign-in");
          }}
          className="btn btn-primary py-3 px-4"
        >
          <strong>Đăng xuất</strong>
        </button>
      </div>
    </div>
  );

  const finishedDetail = (
    <div className="request-form">
      <h2>Đã hoàn tất</h2>
      <div className="form-group mt-5">
        <label>
          Tên: <strong>{user && user.fullName}</strong>
        </label>
      </div>
      <div className="form-group">
        <label>
          Email: <strong>{user && user.email}</strong>
        </label>
      </div>
      <div className="form-group lucky-number">
        <label>
          Số may mắn: <strong>{user && user.gifts.luckyNumber}</strong>
        </label>
      </div>
      <div className="form-group">
        <label style={{ textDecoration: "line-through" }}>
          Quà: <strong>{user && user.gifts.gift}</strong>
        </label>
      </div>
      <div className="form-group">
        <label style={{ textDecoration: "line-through" }}>
          Lì xì: <strong>{user && user.gifts.luckyMoney}</strong>
        </label>
      </div>
      <div className="form-group">
        <label>
          <strong>Chúc bạn tham gia tiệc vui vẻ!</strong>
        </label>
      </div>
      <div className="form-group mt-4">
        <button
          onClick={() => {
            signOut();
            props.history.push("/sign-in");
          }}
          className="btn btn-primary py-3 px-4"
        >
          <strong>Đăng xuất</strong>
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
      {!auth && !user && props.history.push("/sign-in")}
      {auth && user && !user.checked.checkedIn && codeDetail}
      {auth &&
        user &&
        user.checked.checkedIn &&
        !user.gifts.taken &&
        giftDetail}
      {auth &&
        user &&
        user.checked.checkedIn &&
        user.gifts.taken &&
        finishedDetail}
    </Layout>
  );
}

export default Homepage;
