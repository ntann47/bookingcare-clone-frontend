import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { NavLink, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HomeFooter.scss";
import {
  faCheck,
  faLocationDot,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
// import { SampleNextArrow, SamplePrevArrow } from "./Arrows";
class HomeFooter extends Component {
  render() {
    // console.log(this.props);
    return (
      <div className="home-footer">
        <div className="home-main-footer-container">
          <div className="home-main-footer-main-content">
            <div className="col-6 home-main-footer-left">
              <div src="" alt="logo" className="footer-logo"></div>
              <div className="footer-company-name">
                <b>Công ty Cổ phần Công nghệ BookingCare</b>
              </div>
              <div className="footer-main-address">
                <FontAwesomeIcon icon={faLocationDot} className="footer-icon" />{" "}
                28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
              </div>
              <div className="footer-main-permission">
                <FontAwesomeIcon icon={faCheck} className="footer-icon" /> ĐKKD
                số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
              </div>
              <div className="footer-permission-img-wrapper">
                <img
                  className="footer-permission-img"
                  src={"https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"}
                  alt=""
                />
                <img
                  className="footer-permission-img"
                  src={"https://bookingcare.vn/assets/icon/bo-cong-thuong.svg"}
                  alt=""
                />
              </div>
            </div>
            <div className="col-3 home-main-footer-center">
              <ul className="home-main-footer-list">
                <li className="home-main-footer-item">Liên hệ hợp tác</li>
                <li className="home-main-footer-item">
                  Gói chuyển đổi số doanh nghiệp
                </li>
                <li className="home-main-footer-item">Tuyển dụng</li>
                <li className="home-main-footer-item">Câu hỏi thường gặp</li>
                <li className="home-main-footer-item">Điều khoản sử dụng</li>
                <li className="home-main-footer-item">Chính sách Bảo mật</li>
                <li className="home-main-footer-item">
                  Quy trình hỗ trợ giải quyết khiếu nại
                </li>
                <li className="home-main-footer-item">Quy chế hoạt động</li>
              </ul>
            </div>
            <div className="col-3 home-main-footer-right">
              <div className="home-main-footer-more">
                <ul className="home-main-footer-more-list">
                  <li className="home-main-footer-more-item">
                    <div className="home-main-footer-more-item-title">
                      <b>Trụ sở tại Hà Nội</b>
                    </div>
                    <div className="home-main-footer-more-item-content">
                      28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                    </div>
                  </li>
                  <li className="home-main-footer-more-item">
                    <div className="home-main-footer-more-item-title">
                      <b>Văn phòng tại TP Hồ Chí Minh</b>
                    </div>
                    <div className="home-main-footer-more-item-content">
                      Số 01, Hồ Bá Kiện, Phường 15, Quận 10
                    </div>
                  </li>
                  <li className="home-main-footer-more-item">
                    <div className="home-main-footer-more-item-title">
                      <b>Hỗ trợ khách hàng</b>
                    </div>
                    <div className="home-main-footer-more-item-content">
                      support@bookingcare.vn (7h - 18h)
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="home-main-footer-download">
            <FontAwesomeIcon
              icon={faMobileScreenButton}
              className="footer-icon"
            />
            Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng:
            <a href="https://play.google.com/store/apps/details?id=vn.bookingcare.bookingcare">
              {" "}
              Android
            </a>{" "}
            -{" "}
            <a href="https://apps.apple.com/vn/app/bookingcare/id1347700144">
              iPhone/iPad
            </a>{" "}
            - <a href="https://bookingcare.vn/app">Khác</a>
          </div>
        </div>
        <div className="home-sub-footer-container">
          <div className="home-sub-footer-content">
            <div className="home-sub-footer-copyright">
              &copy; 2022 BookingCare
            </div>
            <div className="home-sub-footer-social-wrapper">
              <div className="home-sub-footer-social">
                <img
                  className="home-sub-footer-social-img"
                  src="https://bookingcare.vn/themes/app1912/assets/img/social/youtube-square.svg"
                  alt=""
                />

                <img
                  className="home-sub-footer-social-img"
                  src="https://bookingcare.vn/themes/app1912/assets/img/social/facebook-square.svg"
                  alt=""
                />
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
