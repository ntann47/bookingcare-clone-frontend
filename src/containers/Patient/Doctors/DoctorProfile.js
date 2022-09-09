import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import moment from "moment";
import "./DoctorProfile.scss";
import { LANGUAGES } from "../../../utils";
import { handleGetDoctorProfileByIdService } from "../../../services/userService";
import { Link } from "react-router-dom";
class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorProfile: {},
    };
  }

  async componentDidMount() {
    let id = this.props.doctorId;
    if (id) {
      let respone = await handleGetDoctorProfileByIdService(id);
      if (respone && respone.errCode === 0) {
        this.setState({ doctorProfile: respone.data });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorId !== prevProps.doctorId) {
      let id = this.props.doctorId;

      if (id) {
        let respone = await handleGetDoctorProfileByIdService(id);
        if (respone && respone.errCode === 0) {
          this.setState({ doctorProfile: respone.data });
        }
      }
    }
  }

  toDate = (data) => {
    let timeStamp = +data / 1000;
    let date =
      this.props.language === LANGUAGES.VI
        ? moment.unix(timeStamp).locale("vi").format("dddd - DD/MM/YYYY")
        : moment.unix(timeStamp).locale("en").format("ddd - MM/DD/YYYY");
    return date;
  };
  render() {
    let { language, selectedSchedule } = this.props;
    let { doctorProfile } = this.state;
    let doctorInfo = doctorProfile.Doctor_Info;
    // console.log(doctorInfo);
    return (
      <div className="doctor-profile-container">
        <div className="doctor-intro">
          <div className="content-left">
            {doctorProfile.image && (
              <div
                className="doctor-img"
                style={{
                  backgroundImage: `url(${doctorProfile.image})`,
                }}
              ></div>
            )}
            <div className="doctor-link text-center mt-2">
              <Link to={`/detail-doctor/${this.props.doctorId}`}>Xem thêm</Link>
            </div>
          </div>
          <div className="content-right">
            <div className="doctor-name">
              {doctorProfile && doctorProfile.positionData && (
                <span className="doctor-profile-position">
                  {doctorProfile.positionData.valueVi
                    ? doctorProfile.positionData.valueVi
                    : ""}
                </span>
              )}
              <span className="doctor-profile-name">{` ${doctorProfile.firstName} ${doctorProfile.lastName}`}</span>
            </div>
            {this.props.isShowDescription === true ? (
              <div className="doctor-description">
                {doctorProfile.Markdown &&
                  doctorProfile.Markdown.description && (
                    <p>{doctorProfile.Markdown.description}</p>
                  )}
              </div>
            ) : (
              <>
                {selectedSchedule && selectedSchedule.timeTypeData && (
                  <div className="doctor-schedule-info">
                    <h5 className="booking-title"> Đặt Lịch Khám</h5>
                    <span className="schedule-info">
                      {this.props.language === LANGUAGES.VI
                        ? selectedSchedule.timeTypeData.valueVi
                        : selectedSchedule.timeTypeData.valueEn}
                      {" - " + this.toDate(selectedSchedule.date)}
                    </span>

                    <span className="doctor-profile-price-container">
                      <span className="doctor-profile-price">Giá khám:</span>
                      {doctorInfo && doctorInfo.priceTypeData && (
                        <span className="doctor-price">
                          {" "}
                          {doctorInfo.priceTypeData &&
                          language === LANGUAGES.VI ? (
                            <NumberFormat
                              value={
                                doctorInfo.priceTypeData
                                  ? doctorInfo.priceTypeData.valueVi
                                  : ""
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={"đ"}
                            />
                          ) : (
                            <NumberFormat
                              value={
                                doctorInfo.priceTypeData
                                  ? doctorInfo.priceTypeData.valueEn
                                  : ""
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={"$"}
                            />
                          )}
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
