import React from "react";
import Detail from "./detail";

function Layout({ children }) {
  return (
    <div>
      <img
        src="/images/background.jpg"
        className="background"
        alt="background"
      />
      <div className="hero-wrap container">
        <div className="row slider-text align-items-center">
          <Detail />
          <div className="col-xl-1 col-lg-1 col-md-1" />
          <div className="col-xl-5 col-lg-5 col-md-6 mt-0 mt-md-5 mb-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
