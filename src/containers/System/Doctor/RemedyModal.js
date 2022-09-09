import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../../store/actions";
import "./RemedyModal.scss";
import { CommonUtils } from "../../../utils";
import _ from "lodash";
import { toast } from "react-toastify";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remedyData: {},
      lastName: "",
      email: "",
      remedyBase64: "",
    };
  }

  componentDidMount() {
    this.setState({
      remedyData: this.props.remedyData,
      lastName: this.props.remedyData.patientName,
      email: this.props.remedyData.patientEmail,
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.patientData !== prevProps.patientData) {
      this.setState({
        lastName: this.props.remedyData.patientName,
        email: this.props.remedyData.patientEmail,
      });
    }
  }
  //   builDateGenderSelect = (data) => {
  //     let result = [];
  //     let language = this.props.language;
  //     if (data && data.length > 0) {
  //       for (let i = 0; i < data.length; i++) {
  //         let genderObject = {};
  //         genderObject.label =
  //           language === LANGUAGES.VI ? data[i].valueVi : data[i].valueEn;
  //         genderObject.value = data[i].keyMap;
  //         result.push(genderObject);
  //       }
  //     }
  //     return result;
  //   };
  //   handleSelectedGender = (selectedGender) => {
  //     this.setState({
  //       selectedGender: selectedGender,
  //     });
  //   };
  closeRemedyModal = () => {
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
  handleSubmit = () => {
    console.log(this.state);
    this.props.sendRemedy(this.state);
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        remedyBase64: base64,
      });
    }
  };
  render() {
    return (
      <>
        <Modal
          show={this.props.isShowRemedyModal}
          className="booking-modal-container"
          centered
          size={"lg"}
        >
          <div className="booking-modal-header">
            <span className="booking-modal-title">Hoàn Tất Lịch Khám</span>
            <span
              className="booking-modal-close"
              onClick={this.closeRemedyModal}
            >
              <FontAwesomeIcon icon={faXmark} className="booking-modal-icon" />
            </span>
          </div>
          <div className="booking-modal-body">
            <div className="booking-modal-content">
              <div className="doctor-info"></div>

              <div className="row patient-info-container">
                <div className="col-6 form-group">
                  <label>Họ tên bệnh nhân:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.lastName}
                    disabled
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
                <div className="col-6 form-group">
                  <label>Toa thuốc:</label>
                  <input
                    type="file"
                    className="form-control-file"
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                </div>
                <div className="col-12 form-group">
                  <label>Lý do khám:</label>
                  <textarea
                    className="form-control"
                    // value={this.state.reason}
                    // onChange={(event) =>
                    //   this.handleOnChangeInput(event, "reason")
                    // }
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Xác nhận
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.closeRemedyModal}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
