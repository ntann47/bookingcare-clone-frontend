import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Speciality.scss";
import "../../HomePage/HomePage.scss";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ButtonMore from "../ButtonMore/ButtonMore";
import { handleGetAllSpecialtyService } from "../../../services/userService";
// import { SampleNextArrow, SamplePrevArrow } from "./Arrows";
class Speciality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSpecialties: [],
    };
  }
  async componentDidMount() {
    let respone = await handleGetAllSpecialtyService();
    if (respone && respone.errCode === 0) {
      this.setState({ allSpecialties: respone.data });
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
  handleViewSpecialtyDetail = (id) => {
    if (this.props.history) {
      this.props.history.push(`/specialty-detail/${id}`);
    }
  };
  render() {
    // console.log(this.props);
    let { allSpecialties } = this.state;
    console.log(allSpecialties);
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
      <div className="speciality-container">
        <div className="slider-container">
          <div className="slider-header">
            <h2 className="slider-title">Chuyên khoa phổ biến</h2>
            <ButtonMore className="button-more" />
          </div>
          <div className="slider-content">
            <Slider {...settings}>
              {/* <div className="slider-item-container">
                <div className="slider-item">
                  <div className="img-carousel"></div>
                  <span className="slider-carousel-title">Cơ xương khớp</span>
                </div>
              </div> */}
              {allSpecialties &&
                allSpecialties.length > 0 &&
                allSpecialties.map((item, index) => {
                  console.log(item.id);
                  return (
                    <div
                      className="slider-item-container"
                      key={index}
                      onClick={() => this.handleViewSpecialtyDetail(item.id)}
                    >
                      <div className="slider-item" key={index}>
                        <div
                          className="img-carousel"
                          style={{ background: `url(${item.image})` }}
                        ></div>
                        <span className="slider-carousel-title">
                          {item.name}
                        </span>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Speciality)
);
