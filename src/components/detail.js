import React from "react";
import Countdown from "../components/countdown";

function Detail() {
  return (
    <div className="col-lg-6 col-md-5 year-end-timer">
      <h1 className="mb-4 mt-5">
        <strong>Aureole IT Inc.</strong>
        <br />
        <div className="mt-3">
          <span style={{ color: "#E5C100" }}>Tất niên 2019</span>
        </div>
      </h1>
      <div className="mb-4">
        <i className="fa fa-calendar-check-o mr-3"></i>18:00 Giờ - Thứ 6, Ngày
        10.01.2020
        <div className="mt-3">
          <i className="fa fa-building-o mr-3"></i>BA GÁC NƯỚNG & BIA RESTAURANT
        </div>
        <div className="mt-3">
          <i className="fa fa-location-arrow mr-3"></i>31 Lê Quý Đôn, Phường 7,
          Quận 3, TP. HCM
        </div>
      </div>
      <Countdown eventTime="Fri Jan 10 2020 18:00:00 GMT+0700 (Indochina Time)" />
    </div>
  );
}

export default Detail;
