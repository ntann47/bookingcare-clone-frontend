import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./HeaderHome.scss";
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
import { LANGUAGES } from "../../utils";
import { changeSystemLanguage } from "../../store/actions";
import Banner from "./Banner/Banner";
class HeaderHome extends Component {
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
      <>
        <div className="header-home">
          <div className="header-home-container">
            <div className="left-content">
              <div className="header-bars">
                <FontAwesomeIcon icon={faBars} />
              </div>
              <div
                className="header-logo"
                onClick={() => this.returnHomePage()}
              ></div>
            </div>
            <div className="center-content">
              <ul className="header-list">
                <li className="header-item">
                  <div className="item-title">
                    <b>
                      <FormattedMessage id="homeheader.speciality" />
                    </b>
                  </div>
                  <span className="item-description">
                    <FormattedMessage id="homeheader.search-doctor" />
                  </span>
                </li>
                <li className="header-item">
                  <div className="item-title">
                    <b>
                      <FormattedMessage id="homeheader.health-facility" />
                    </b>
                  </div>
                  <span className="item-description">
                    <FormattedMessage id="homeheader.select-room" />
                  </span>
                </li>
                <li className="header-item">
                  <div className="item-title">
                    <b>
                      <FormattedMessage id="homeheader.doctor" />
                    </b>
                  </div>
                  <span className="item-description">
                    <FormattedMessage id="homeheader.select-doctor" />
                  </span>
                </li>
                <li className="header-item">
                  <div className="item-title">
                    <b>
                      <FormattedMessage id="homeheader.fee" />
                    </b>
                  </div>
                  <span className="item-description">
                    <FormattedMessage id="homeheader.check-health" />
                  </span>
                </li>
              </ul>
            </div>
            <div className="right-content">
              <div className="help">
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="header-icon"
                />
                <span className="help-text">
                  <FormattedMessage id="homeheader.support" />
                </span>
              </div>
              <div className="language">
                <span
                  className={
                    this.props.language === LANGUAGES.EN
                      ? "language-title action"
                      : "language-title"
                  }
                  onClick={() => this.changeSystemLanguague(LANGUAGES.EN)}
                >
                  EN
                </span>
                <span
                  className={
                    this.props.language === LANGUAGES.VI
                      ? "language-title action"
                      : "language-title"
                  }
                  onClick={() => this.changeSystemLanguague(LANGUAGES.VI)}
                >
                  VI
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && <Banner />}
      </>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderHome)
);
