import React, { Component } from "react";
import { Redirect } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DoctorSchedule.scss";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { handleGetDoctorDetailByIdService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import { handleGetDoctorScheduleByDateService } from "../../../services/userService";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import BookingModal from "../Modal/BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allTimes: [],
      isShowModal: false,
      selectedSchedule: {},
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    let arrDate = this.getAllDays(language);
    this.setState({ allDays: arrDate });
    if (this.props.doctorId) {
      let arrDate = this.getAllDays(language);
      if (arrDate && arrDate.length > 0) {
        let result = await handleGetDoctorScheduleByDateService(
          this.props.doctorId,
          arrDate[0].value
        );
        if (result && result.errCode === 0) {
          this.setState({
            allTimes: result.data,
          });
        }
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let { language } = this.props;
    if (prevProps.language !== this.props.language) {
      let arrDate = this.getAllDays(language);
      this.setState({ allDays: arrDate });
    }
    if (prevProps.doctorId !== this.props.doctorId) {
      let arrDate = this.getAllDays(language);
      if (arrDate && arrDate.length > 0) {
        let result = await handleGetDoctorScheduleByDateService(
          this.props.doctorId,
          arrDate[0].value
        );
        if (result && result.errCode === 0) {
          this.setState({
            allTimes: result.data,
          });
        }
      }
    }
  }
  handleOnChangeSelect = async (event) => {
    if (this.props.doctorId) {
      let doctorId = this.props.doctorId;
      let date = event.target.value;
      let result = await handleGetDoctorScheduleByDateService(doctorId, date);
      console.log(result);
      if (result && result.errCode === 0) {
        this.setState({
          allTimes: result.data,
        });
      }
    }
  };

  /*
Life cycle
* Run component
1. Run constructor -> init state
2. Did mount (gán giá trị cho state setState)
3 Render
*/
  getAllDays = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let day = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let today = moment(new Date())
            .add(i, "days")
            .locale("vi")
            .format("DD/MM");
          day.label = `Hôm nay - ${today}`;
        } else {
          day.label = moment(new Date())
            .add(i, "days")
            .locale("vi")
            .format("ddd - DD/MM");
        }
      } else {
        if (i === 0) {
          let today = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("DD/MM");
          day.label = `Today - ${today}`;
        } else {
          day.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      day.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(day);
    }
    return arrDate;
  };
  handleOnClickBooking = (time) => {
    this.setState({
      selectedSchedule: time,
      isShowModal: !this.state.isShowModal,
    });
  };
  toggle = () => {
    this.setState({
      isShowModal: !this.state.isShowModal,
    });
  };

  render() {
    let { allDays, allTimes } = this.state;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedules">
            <select
              className="all-schedules-select"
              onChange={(event) => this.handleOnChangeSelect(event)}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="calendar-header">
            <FontAwesomeIcon icon={faCalendarDays} className="calendar-icon" />
            <span className="calendar-title">
              <FormattedMessage id="patient.doctor-detail.schedule" />
            </span>
          </div>
          <div className="all-time">
            {allTimes && allTimes.length > 0 ? (
              <>
                {allTimes.map((item, index) => {
                  return (
                    <button
                      className="btn btn-schedule"
                      key={index}
                      onClick={() => this.handleOnClickBooking(item)}
                    >
                      {this.props.language === LANGUAGES.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn}
                    </button>
                  );
                })}
              </>
            ) : (
              <div>Chưa có lịch hẹn trong thời gian này.</div>
            )}
          </div>
        </div>
        {this.state.isShowModal && (
          <BookingModal
            isShowModal={this.state.isShowModal}
            selectedSchedule={this.state.selectedSchedule}
            toggle={this.toggle}
          />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
