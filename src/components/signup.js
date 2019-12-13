import React from "react";

function Signup() {
  return (
    <div className="col-xl-4 col-lg-5 col-md-6 mt-0 mt-md-5 mb-5">
      <form action="#" className="request-form">
        <h2>Đăng ký ngay</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Họ và Tên *"
            required
          />
        </div>
        <div className="form-group">
          <div className="input-group">
            <div class="input-group-append">
              <span class="input-group-text mr-2" id="phone-number">
                +84
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Điện thoại *"
              required
              aria-describedby="phone-number"
            />
          </div>
        </div>

        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Email *"
              aria-describedby="email"
              required
            />
            <div class="input-group-append">
              <span class="input-group-text" id="email">
                @ait.com
              </span>
            </div>
          </div>
        </div>

        <div className="form-group text-right">
          <label className="mr-2">
            <em>
              Nhớ nhập đúng <strong>Email</strong> để có quà nhé!
            </em>
          </label>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Đăng ký"
            className="btn btn-primary py-3 px-4"
          />
        </div>
        <div className="form-group text-center">
          <label className="mr-2 mt-2">Bạn đã đăng ký, đăng nhập ngay.</label>
        </div>
      </form>
    </div>
  );
}

export default Signup;
