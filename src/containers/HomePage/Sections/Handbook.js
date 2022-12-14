import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Handbook.scss";
import "../../HomePage/HomePage.scss";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ButtonMore from "../ButtonMore/ButtonMore";
import { LANGUAGES } from "../../../utils";
// import { SampleNextArrow, SamplePrevArrow } from "./Arrows";
class Handbook extends Component {
  SampleNextArrow = (props) => {
    let { className, style, onClick } = props;
    // console.log(props.className);
    className = className + " next-arrow";
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <div className="arrow-icon">
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    );
  };

  SamplePrevArrow = (props) => {
    let { className, style, onClick } = props;
    // console.log(typeof className);
    className = className + " prev-arrow";

    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <div className="arrow-icon">
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
      </div>
    );
  };

  render() {
    let { isDoctorsAndFacilities, language } = this.props;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      nextArrow: <this.SampleNextArrow />,
      prevArrow: <this.SamplePrevArrow />,
    };
    return (
      <div className="handbook-container">
        <div className="slider-container">
          <div className="slider-header">
            <h2 className="slider-title">
              {isDoctorsAndFacilities === true
                ? language === LANGUAGES.VI
                  ? "D??nh cho b??c s?? v?? c??c c?? s??? y t???"
                  : "For doctors and medical facilities"
                : language === LANGUAGES.VI
                ? "C???m nang"
                : "Handboo"}
            </h2>
            <ButtonMore className="button-more" />
          </div>
          <div className="slider-content">
            <Slider {...settings}>
              <div className="handbook-item-container">
                <div className="outer-handbook">
                  <div className="handbook-img-wrapper">
                    <div className="handbook-img-carousel"></div>
                  </div>

                  <div className="handbook-slider-title">
                    B??c s?? Chuy??n khoa II Tr???n Minh Khuy??n
                  </div>
                </div>
              </div>
              <div className="handbook-item-container">
                <div className="outer-handbook">
                  <div className="handbook-img-wrapper">
                    <div className="handbook-img-carousel"></div>
                  </div>
                  <div className="handbook-slider-info">
                    <div className="handbook-slider-title">
                      B??c s?? Chuy??n khoa II Tr???n Minh Khuy??n
                    </div>
                    <div className="handbook-slider-speciality">
                      S???c kh???e t??m th???n - T?? v???n, tr??? li???u T??m l??
                    </div>
                  </div>
                </div>
              </div>
              <div className="handbook-item-container">
                <div className="outer-handbook">
                  <div className="handbook-img-wrapper">
                    <div className="handbook-img-carousel"></div>
                  </div>
                  <div className="handbook-slider-info">
                    <div className="handbook-slider-title">
                      B??c s?? Chuy??n khoa II Tr???n Minh Khuy??n
                    </div>
                    <div className="handbook-slider-speciality">
                      S???c kh???e t??m th???n - T?? v???n, tr??? li???u T??m l??
                    </div>
                  </div>
                </div>
              </div>
              <div className="handbook-item-container">
                <div className="outer-handbook">
                  <div className="handbook-img-wrapper">
                    <div className="handbook-img-carousel"></div>
                  </div>
                  <div className="handbook-slider-info">
                    <div className="handbook-slider-title">
                      B??c s?? Chuy??n khoa II Tr???n Minh Khuy??n
                    </div>
                    <div className="handbook-slider-speciality">
                      S???c kh???e t??m th???n - T?? v???n, tr??? li???u T??m l??
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
