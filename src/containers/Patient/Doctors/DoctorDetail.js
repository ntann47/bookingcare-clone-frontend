import React, { Component } from "react";
import { Redirect } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DoctorDetail.scss";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import HeaderHome from "../../HomePage/HeaderHome";
import { handleGetDoctorDetailByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import HomeFooter from "../../HomePage/Sections/HomeFooter";
import DoctorExtraInfo from "./DoctorExtraInfo";
class DoctorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorDetail: {},
      currentDoctorId: "",
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let doctorId = this.props.match.params.id;
      this.setState({ currentDoctorId: doctorId });
      let res = await handleGetDoctorDetailByIdService(doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          doctorDetail: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  /*
Life cycle
* Run component
1. Run constructor -> init state
2. Did mount (gán giá trị cho state setState)
3 Render
*/

  render() {
    let { language } = this.props;
    let { doctorDetail } = this.state;
    // console.log(doctorDetail);
    let nameVi = "";
    let nameEn = "";
    if (doctorDetail && doctorDetail.positionData) {
      nameVi = `${doctorDetail.positionData.valueVi} ${doctorDetail.firstName} ${doctorDetail.lastName}`;
      nameEn = `${doctorDetail.positionData.valueEn} ${doctorDetail.firstName} ${doctorDetail.lastName}`;
    }
    return (
      <>
        <HeaderHome isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="doctor-detail-content">
            <div className="doctor-intro">
              <div className="content-left">
                {doctorDetail.image && (
                  <div
                    className="doctor-img"
                    style={{
                      backgroundImage: `url(${doctorDetail.image})`,
                    }}
                  ></div>
                )}
              </div>
              <div className="content-right">
                <div className="doctor-name">
                  <p>{language === LANGUAGES.VI ? nameVi : nameEn}</p>
                </div>

                <div className="doctor-description">
                  {doctorDetail.Markdown &&
                    doctorDetail.Markdown.description && (
                      <p>{doctorDetail.Markdown.description}</p>
                    )}
                </div>
                <div className="facebook-actions"></div>
              </div>
            </div>
            <div className="doctor-detail-main">
              <div className="doctor-schedule">
                <div className="doctor-schedule-left">
                  <DoctorSchedule doctorId={this.state.currentDoctorId} />
                </div>
                <div className="doctor-schedule-right">
                  <DoctorExtraInfo
                    doctorId={this.state.currentDoctorId}
                    borderLeft={true}
                  />
                </div>
              </div>

              {doctorDetail &&
                doctorDetail.Markdown &&
                doctorDetail.Markdown.contentHTML && (
                  <div
                    className="doctor-detail"
                    dangerouslySetInnerHTML={{
                      __html: doctorDetail.Markdown.contentHTML,
                    }}
                  ></div>
                )}

              <div className="doctor-feedback"></div>
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
