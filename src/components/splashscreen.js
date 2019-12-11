import React from "react";
import "./splashscreen.scss";

const Splash = () => {
  return (
    <div className="splash-screen">
      <img src="/icons/aureole-logo.192.png" alt="splashscreen" />
      <div className="loading-dot">.</div>
    </div>
  );
};

export default Splash;
