import React, { useContext } from "react";
import Countdown from "../../components/countdown";
import ChristmasCountdown from "./countdown";

import { UserContext } from "../../contexts/user";
import Navigation from "./navigation";

function Template(props) {
  const { auth } = useContext(UserContext);

  return (
    <div>
      <img
        src="/images/christmas-background.jpg"
        className="background"
        alt="background"
      />
      <div className="hero-wrap container">
        <div className="row slider-text align-items-center">
          <Navigation />
          <div className="col-xl-6 col-lg-6 col-md-6 mb-5">
            <div className="event-form">
              <h1 className="mb-4 mt-5">
                <strong>Year-End Party</strong>
                <br />
                <div className="mt-3">
                  <span>Tất niên 2019</span>
                </div>
              </h1>
              <div className="mb-4">
                <i className="fa fa-calendar-check-o mr-3" />
                18:00 Giờ - Thứ 6, Ngày 10.01.2020
                <div className="mt-3">
                  <i className="fa fa-building-o mr-3"></i>BA GÁC NƯỚNG & BIA
                  RESTAURANT
                </div>
                <div className="mt-3">
                  <i className="fa fa-location-arrow mr-3"></i>31 Lê Quý Đôn,
                  Phường 7, Quận 3, TP. HCM
                </div>
              </div>
              <Countdown eventTime="Fri Jan 10 2020 18:00:00 GMT+0700 (Indochina Time)" />
              <div className="form-group">
                <button className="btn btn-primary py-3 px-4" disabled>
                  Chưa mở đăng ký
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 mb-5">
            <div className="event-form christmas-timer">
              <h1 className="mb-4 mt-5">
                <strong>Christmas Party</strong>
                <br />
                <div className="mt-3">
                  <span style={{ color: "#dc3545" }}>Giáng sinh 2019</span>
                </div>
              </h1>
              <div className="mb-4">
                <i className="fa fa-calendar-check-o mr-3"></i>16:30 Giờ - Thứ
                6, Ngày 20.12.2019
                <div className="mt-3">
                  <i className="fa fa-building-o mr-3"></i>Văn phòng, trụ sở
                  chính Aureole IT Inc.
                </div>
                <div className="mt-3">
                  <i className="fa fa-location-arrow mr-3"></i>Tầng 9, Tòa nhà
                  Saigon Finance Center.
                </div>
              </div>
              <ChristmasCountdown eventTime="Fri Dec 20 2019 16:30:00 GMT+0700 (Indochina Time)" />
              <div className="form-group">
                <button
                  className="btn btn-danger py-3 px-4"
                  onClick={() => {
                    if (auth) props.history.push("/christmas-gifts");
                    else props.history.push("/sign-in");
                  }}
                  disabled={
                    new Date() >
                    new Date(
                      "Fri Dec 20 2019 16:30:00 GMT+0700 (Indochina Time)"
                    )
                  }
                >
                  Hết hạn đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;
