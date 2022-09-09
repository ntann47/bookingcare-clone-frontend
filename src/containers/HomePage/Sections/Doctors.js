import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Speciality.scss";
import "./Doctors.scss";
import "../../HomePage/HomePage.scss";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ButtonMore from "../ButtonMore/ButtonMore";
import { LANGUAGES } from "../../../utils";
// import { SampleNextArrow, SamplePrevArrow } from "./Arrows";
class Doctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDoctorsList: [],
    };
  }
  componentDidMount() {
    this.props.fetchTopDoctors();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        topDoctorsList: this.props.topDoctors,
      });
    }
  }
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
  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  render() {
    let listDoctor = this.state.topDoctorsList;
    let { language } = this.props;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      nextArrow: <this.SampleNextArrow />,
      prevArrow: <this.SamplePrevArrow />,
    };
    return (
      <div className="doctors-container">
        <div className="slider-container">
          <div className="slider-header">
            <h2 className="slider-title">
              <FormattedMessage id="home-page.outstanding-doctors" />
            </h2>
            <ButtonMore className="button-more" />
          </div>
          <div className="slider-content">
            <Slider {...settings}>
              {listDoctor &&
                listDoctor.map((item, index) => {
                  let profileImg;
                  if (item.image) {
                    profileImg = Buffer.from(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi} ${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`;
                  return (
                    <div className="doctors-item-container">
                      <div className="outer-doctors">
                        <div className="doctors-img-wrapper">
                          <div
                            className="doctors-img-carousel"
                            style={{ backgroundImage: `url(${profileImg})` }}
                            onClick={() => this.handleViewDetailDoctor(item)}
                          ></div>
                        </div>
                        <div className="doctors-slider-info">
                          <div
                            className="doctors-slider-title"
                            onClick={() => this.handleViewDetailDoctor(item)}
                          >
                            {language === LANGUAGES.EN ? nameEn : nameVi}
                          </div>
                          <div className="doctors-slider-speciality">
                            Sức khỏe tâm thần - Tư vấn, trị liệu Tâm lý
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    topDoctors: state.home.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopDoctors: () => dispatch(actions.fetchTopDoctorsHomeStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Doctors)
);
