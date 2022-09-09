import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import { Link, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Download.scss";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

class Download extends Component {
  render() {
    return (
      <div className="download-container">
        <div className="download-content-wrapper">
          <div className="download-img"></div>
          <div className="download-content">
            <h2 className="download-title">Tải ứng dụng BookingCare</h2>
            <ul className="download-list">
              <li className="download-list-item">
                <FontAwesomeIcon icon={faCheck} className="item-icon" /> Đặt
                khám nhanh hơn
              </li>
              <li className="download-list-item">
                <FontAwesomeIcon icon={faCheck} className="item-icon" /> Nhận
                thông báo từ hệ thống
              </li>
              <li className="download-list-item">
                <FontAwesomeIcon icon={faCheck} className="item-icon" /> Nhận
                hướng dẫn đi khám chi tiết
              </li>
              <li className="download-list-item">
                <div className="app-container">
                  <a href="https://play.google.com/store/apps/details?id=vn.bookingcare.bookingcare">
                    <img
                      className="app-google"
                      src="https://bookingcare.vn/assets/icon/google-play-badge.svg"
                      alt=""
                    />
                  </a>
                  <a href="https://apps.apple.com/vn/app/bookingcare/id1347700144">
                    <img
                      className="app-apple"
                      src="https://bookingcare.vn/assets/icon/app-store-badge-black.svg"
                      alt=""
                    />
                  </a>
                </div>
              </li>
              <li className="download-list-item">
                <span className="download-message">
                  Hoặc mở liên kết:{" "}
                  <a href="https://bookingcare.vn/app">
                    https://bookingcare.vn/app
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Download);
