import React from "react";

import Detail from "../components/detail";
import Signup from "../components/signup";

function Template() {
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
          <div className="col-xl-2 col-lg-1 col-md-1" />
          <Signup />
        </div>
      </div>
    </div>
  );
}

export default Template;
