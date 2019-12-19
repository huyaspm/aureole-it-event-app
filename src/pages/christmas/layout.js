import React from "react";
import ChristmasCountdown from "./countdown";

function Layout({ children }) {
  return (
    <div>
      <img
        src="/images/chistmas-background.jpg"
        className="background"
        alt="background"
      />
      <div className="hero-wrap container">
        <div className="row slider-text chrismast-form align-items-center">
          <div className="col-xl-6 col-lg-6 col-md-6 mt-0 mt-5 mb-5">
            <h1 className="mb-4 mt-5">
              <strong>Aureole IT Inc.</strong>
              <br />
              <div className="mt-3">
                <span>Giáng sinh 2019</span>
              </div>
            </h1>
            <div className="mb-4">
              <i className="fa fa-calendar-check-o mr-3"></i>16:30 Giờ - Thứ 6,
              Ngày 20.12.2019
              <div className="mt-3">
                <i className="fa fa-building-o mr-3"></i>Văn phòng, trụ sở chính
                Aureole IT Inc.
              </div>
              <div className="mt-3">
                <i className="fa fa-location-arrow mr-3"></i>Tầng 9, Tòa nhà
                Saigon Finance Center.
              </div>
            </div>
            <ChristmasCountdown eventTime="Fri Dec 20 2019 16:30:00 GMT+0700 (Indochina Time)" />
          </div>
          <div className="col-xl-1 col-lg-1 col-md-1" />
          <div className="col-xl-5 col-lg-5 col-md-5 mt-0 mt-md-5 mb-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
