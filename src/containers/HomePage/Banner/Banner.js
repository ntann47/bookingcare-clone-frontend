import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Banner.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBed,
  faHospital,
  faMicroscope,
  faMobileScreenButton,
  faQuestionCircle,
  faSearch,
  faTooth,
  faTruckMedical,
  faUserDoctor,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { LANGUAGES } from "../../../utils";
import { changeSystemLanguage } from "../../../store/actions";

class Banner extends Component {
  changeSystemLanguague = (language) => {
    // alert("change system language to " + language);
    this.props.changeLanguageRedux(language);
  };
  returnHomePage = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    return (
      <div className="header-banner">
        <div className="background-banner">
          <div className="content-up">
            <div className="title">
              <div className="first-title">NỀN TẢNG Y TẾ</div>
              <div className="second-title">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
            </div>
            <div className="search-container">
              <div className="search">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
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
          <div className="content-down">
            <div className="options">
              <ul className="header-options-list">
                <li className="options-item">
                  <div className="options-icon-wrap">
                    <FontAwesomeIcon
                      icon={faHospital}
                      className="options-icon"
                    />
                  </div>
                  <div className="options-title">
                    Khám <br /> chuyên khoa
                  </div>
                </li>
                <li className="options-item">
                  <div className="options-icon-wrap">
                    <FontAwesomeIcon
                      icon={faMobileScreenButton}
                      className="options-icon"
                    />
                  </div>
                  <div className="options-title">
                    Khám <br /> từ xa
                  </div>
                </li>
                <li className="options-item">
                  <div className="options-icon-wrap">
                    <FontAwesomeIcon icon={faBed} className="options-icon" />
                  </div>
                  <div className="options-title">
                    Khám <br /> tổng quát
                  </div>
                </li>
                <li className="options-item">
                  <div className="options-icon-wrap">
                    <FontAwesomeIcon
                      icon={faMicroscope}
                      className="options-icon"
                    />
                  </div>
                  <div className="options-title">
                    Xét nghiệm <br /> y học
                  </div>
                </li>
                <li className="options-item">
                  <div className="options-icon-wrap">
                    <FontAwesomeIcon
                      icon={faUserDoctor}
                      className="options-icon"
                    />
                  </div>
                  <div className="options-title">
                    Sức khỏe <br />
                    tinh thần
                  </div>
                </li>
                <li className="options-item">
                  <div className="options-icon-wrap">
                    <FontAwesomeIcon icon={faTooth} className="options-icon" />
                  </div>
                  <div className="options-title">
                    Khám <br />
                    nha khoa
                  </div>
                </li>

                <li className="options-item">
                  <div className="options-icon-wrap">
                    <FontAwesomeIcon
                      icon={faTruckMedical}
                      className="options-icon"
                    />
                  </div>
                  <div className="options-title">
                    Sản phẩm <br /> y tế
                  </div>
                </li>
                <li className="options-item">
                  <div className="options-icon-wrap">
                    <FontAwesomeIcon icon={faUsers} className="options-icon" />
                  </div>
                  <div className="options-title">
                    Sức khỏe <br /> doanh nghiệp
                  </div>
                </li>
              </ul>
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
  return {
    changeLanguageRedux: (language) => dispatch(changeSystemLanguage(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Banner));
