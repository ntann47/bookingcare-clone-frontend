import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import HeaderHome from "./HeaderHome";
import Speciality from "./Sections/Speciality";
import MedicalFacility from "./Sections/MedicalFacility";
import Doctors from "./Sections/Doctors";
import Handbook from "./Sections/Handbook";
import About from "./Sections/About";
import HomeFooter from "./Sections/HomeFooter";
import Download from "./Sections/Download";
class HomePage extends Component {
  render() {
    return (
      <div className="home-page">
        <HeaderHome isShowBanner={true} />
        <div className="home-content">
          <Speciality />
          <MedicalFacility />
          <Doctors />
          <About />
          <Download />
          <HomeFooter />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
