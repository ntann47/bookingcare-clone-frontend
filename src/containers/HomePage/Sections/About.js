import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Speciality.scss";
import "./About.scss";
import "../../HomePage/HomePage.scss";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ButtonMore from "../ButtonMore/ButtonMore";
// import { SampleNextArrow, SamplePrevArrow } from "./Arrows";
class About extends Component {
  render() {
    // console.log(this.props);
    return (
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">Truyền thông nói về BookingCare</h2>
        </div>
        <div className="about-item-container">
          {/* <div className="outer-about">
            <div className="about-vid-wrapper">
              <div className="about-vid">
               
              </div>
            </div>
            <div className="about-slider-title">
            </div>
          </div> */}
          <div className="about-vid">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="about-others">
            <ul className="about-others-list">
              <li className="about-others-item">
                <img
                  src="https://bookingcare.vn/assets/truyenthong/suckhoedoisong.png"
                  className="about-others-img"
                  alt=""
                />
              </li>
              <li className="about-others-item">
                <img
                  src="https://bookingcare.vn/assets/truyenthong/vtv1.png"
                  className="about-others-img"
                  alt=""
                />
              </li>

              <li className="about-others-item">
                <img
                  src="https://bookingcare.vn/assets/truyenthong/ictnews.png"
                  className="about-others-img"
                  alt=""
                />
              </li>
              <li className="about-others-item">
                <img
                  src="https://bookingcare.vn/assets/truyenthong/vnexpress.png"
                  className="about-others-img"
                  alt=""
                />
              </li>
              <li className="about-others-item">
                <img
                  src="https://bookingcare.vn/assets/truyenthong/vtcnews.png"
                  className="about-others-img"
                  alt=""
                  style={{ backgroundColor: "#a3171e" }}
                />
              </li>
              <li className="about-others-item">
                <img
                  src="https://bookingcare.vn/assets/truyenthong/cuc-cong-nghe-thong-tin-bo-y-te-2.png"
                  className="about-others-img"
                  alt=""
                />
              </li>
              <li className="about-others-item">
                <img
                  src="https://bookingcare.vn/assets/truyenthong/infonet.png"
                  className="about-others-img"
                  alt=""
                />
              </li>
              <li className="about-others-item">
                <img
                  src="https://bookingcare.vn/assets/truyenthong/suckhoedoisong.png"
                  className="about-others-img"
                  alt=""
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
