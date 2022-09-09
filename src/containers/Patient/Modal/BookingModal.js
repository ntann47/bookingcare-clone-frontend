import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import moment from "moment";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import DoctorProfile from "../Doctors/DoctorProfile";

import * as actions from "../../../store/actions";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../utils";
import { handlePostPatientBookAppointment } from "../../../services/userService";
import _ from "lodash";
import { toast } from "react-toastify";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      doctorId: "",
      timeType: "",
      date: "",
      doctorName: "",
      allGenders: [],
      selectedGender: {},
      selectedSchedule: "",
    };
  }

  componentDidMount() {
    this.props.fetchGender();
    if (
      this.props.selectedSchedule &&
      !_.isEmpty(this.props.selectedSchedule)
    ) {
      let time =
        this.props.language === LANGUAGES.VI
          ? this.props.selectedSchedule.timeTypeData.valueVi
          : this.props.selectedSchedule.timeTypeData.valueEn;
      time = time + " - " + this.toDate(this.props.selectedSchedule.date);
      this.setState({
        selectedSchedule: time,
        doctorId: this.props.selectedSchedule.doctorId,
        timeType: this.props.selectedSchedule.timeType,
        date: this.props.selectedSchedule.date,
      });
    }
    if (
      this.props.selectedSchedule.doctorData &&
      !_.isEmpty(this.props.selectedSchedule.doctorData)
    ) {
      let doctor = this.props.selectedSchedule.doctorData;
      this.setState({
        doctorName: doctor.firstName + " " + doctor.lastName,
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        allGenders: this.builDateGenderSelect(this.props.genders),
      });
    }
  }
  builDateGenderSelect = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let genderObject = {};
        genderObject.label =
          language === LANGUAGES.VI ? data[i].valueVi : data[i].valueEn;
        genderObject.value = data[i].keyMap;
        result.push(genderObject);
      }
    }
    return result;
  };
  handleSelectedGender = (selectedGender) => {
    this.setState({
      selectedGender: selectedGender,
    });
  };
  closeBookingModal = () => {
    this.props.toggle();
  };
  handleOnChangeInput = (event, id) => {
    let value = event.target.value;
    let copyState = { ...this.state };
    copyState[id] = value;
    this.setState({
      ...copyState,
    });
  };
  toDate = (data) => {
    let timeStamp = +data / 1000;
    let date =
      this.props.language === LANGUAGES.VI
        ? moment.unix(timeStamp).locale("vi").format("ddd - DD/MM/YYYY")
        : moment.unix(timeStamp).locale("en").format("ddd - MM/DD/YYYY");
    return date;
  };
  handleSubmitBookSchedule = async () => {
    let respone = await handlePostPatientBookAppointment({
      language: this.props.language,
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      doctorName: this.state.doctorName,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      date: this.state.date,
      reason: this.state.reason,
      gender: this.state.selectedGender.value,
      selectedSchedule: this.state.selectedSchedule,
    });
    if (respone && respone.errCode === 0) {
      // this.closeBookingModal();
      toast.success("Successfull");
    } else {
      toast.success("Error");
    }
  };
  render() {
    let { selectedSchedule } = this.props;
    console.log("selectedSchedule");
    console.log(selectedSchedule);
    return (
      <>
        <Modal
          show={this.props.isShowModal}
          className="booking-modal-container"
          centered
          size={"lg"}
        >
          <div className="booking-modal-header">
            <span className="booking-modal-title">Thông Tin Đặt Lịch Khám</span>
            <span
              className="booking-modal-close"
              onClick={this.closeBookingModal}
            >
              <FontAwesomeIcon icon={faXmark} className="booking-modal-icon" />
            </span>
          </div>
          <div className="booking-modal-body">
            <div className="booking-modal-content">
              <div className="doctor-info">
                {this.state.doctorId && this.props.selectedSchedule && (
                  <DoctorProfile
                    selectedSchedule={selectedSchedule}
                    doctorId={this.state.doctorId}
                    // isShowDescription={true}
                  />
                )}
              </div>

              <div className="row patient-info-container">
                <div className="col-6 form-group">
                  <label>Họ tên</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.fullName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "fullName")
                    }
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label>Giới tính:</label>
                  <Select
                    value={this.state.selectedGender}
                    onChange={(selectedGender) =>
                      this.handleSelectedGender(selectedGender)
                    }
                    options={this.state.allGenders}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>Điện thoại:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "phoneNumber")
                    }
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <label>Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.email}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "email")
                    }
                  ></input>
                </div>
                <div className="col-12 form-group">
                  <label>Địa chỉ:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                  ></input>
                </div>
                <div className="col-12 form-group">
                  <label>Lý do khám:</label>
                  <textarea
                    className="form-control"
                    value={this.state.reason}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "reason")
                    }
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleSubmitBookSchedule}
              >
                Xác nhận
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.closeBookingModal}
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
