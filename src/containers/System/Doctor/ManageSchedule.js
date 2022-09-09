import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Select from "react-select";
import moment from "moment";
import DatePicker from "../../../components/Input/DatePicker";
// import moment from "moment";
// import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";
import Header from "../../Header/Header";
import {
  fetchAllcodeScheduleStart,
  fetchAllDoctorsStart,
  saveDoctorInfoStart,
} from "../../../store/actions";
import { handleBulkCreateScheduleService } from "../../../services/userService";
import { LANGUAGES, dateFormat } from "../../../utils";
import "./ManageSchedule.scss";
import { toast } from "react-toastify";
import _ from "lodash";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      times: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchSchedules();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors.length !== this.props.allDoctors.length) {
      let doctors = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        allDoctors: doctors,
      });
    }
    if (prevProps.language !== this.props.language) {
      let doctors = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        allDoctors: doctors,
      });
    }
    if (prevProps.schedules !== this.props.schedules) {
      let data = this.props.schedules;
      if (data && data.length > 0) {
        // data.map((item) => {
        //   item.isSelected = false;
        //   return item;
        // });
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        times: data,
      });
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData.length > 0) {
      for (let i = 0; i < inputData.length; i++) {
        let object = {};
        let labelVi = `${inputData[i].firstName} ${inputData[i].lastName}`;
        let labelEn = `${inputData[i].lastName} ${inputData[i].firstName}`;
        object.label = this.props.language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = inputData[i].id;
        result.push(object);
      }
    }
    return result;
  };
  // Finish!
  handleSelectChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleOnchangeDate = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleOnClickTimeButton = (time) => {
    let schedules = this.state.times;
    if (schedules && schedules.length > 0) {
      schedules = schedules.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
    }
    this.setState({
      times: schedules,
    });
  };
  handleSaveSchedule = async () => {
    let { times, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error(`Please select a date`);
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error(`Please select a Doctor`);
      return;
    }
    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let formattedDate = new Date(currentDate).getTime();
    if (times && times.length > 0) {
      let selectedTimes = times.filter((time) => time.isSelected === true);
      if (selectedTimes && selectedTimes.length > 0) {
        selectedTimes.map((item) => {
          let object = {
            doctorId: selectedDoctor.value,
            date: formattedDate,
            timeType: item.keyMap,
          };
          result.push(object);
          return result;
        });
        let data = {
          data: result,
          doctorId: selectedDoctor.value,
          formattedDate: formattedDate,
        };
        await handleBulkCreateScheduleService(data);
      } else {
      }
    }
  };
  render() {
    let { times } = this.state;
    return (
      <div className="manage-schedule-container">
        <div className="manage-schedule-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="manage-schedule-content">
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label> Chọn Bác Sĩ</label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={(selectedDoctor) =>
                    this.handleSelectChange(selectedDoctor)
                  }
                  options={this.state.allDoctors}
                />
              </div>
              <div className="col-6 form-group">
                <label> Chọn Ngày</label>
                <DatePicker
                  onChange={this.handleOnchangeDate}
                  className="form-control"
                  value={this.state.currentDate}
                  minDate={
                    new Date(new Date().setDate(new Date().getDate() - 1))
                  }
                />
              </div>
            </div>
            <div className="hours-container">
              {times &&
                times.length > 0 &&
                times.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule active"
                          : "btn btn-schedule"
                      }
                      key={index}
                      onClick={() => this.handleOnClickTimeButton(item)}
                    >
                      {this.props.language === LANGUAGES.VI
                        ? item.valueVi
                        : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <button
              className="btn btn-primary"
              onClick={this.handleSaveSchedule}
            >
              Lưu
            </button>
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
    allDoctors: state.admin.allDoctors,
    schedules: state.admin.schedules,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(fetchAllDoctorsStart()),
    saveDoctorInfo: (data) => dispatch(saveDoctorInfoStart(data)),
    fetchSchedules: () => dispatch(fetchAllcodeScheduleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
