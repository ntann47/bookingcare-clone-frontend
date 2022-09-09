import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { connect } from "react-redux";
import DatePicker from "../../../components/Input/DatePicker";
import {
  handleGetListPatientForDoctorService,
  handleSendRemedyService,
} from "../../../services/userService";
import "./ManagePatient.scss";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "",
      doctorName: "",
      currentDate: moment(new Date()).startOf("day").valueOf(),
      patientData: [],
      isShowRemedyModal: false,
      remedyData: {},
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    let { user } = this.props;
    let doctorName = user.firstName + " " + user.lastName;
    this.setState({
      language: this.props.language,
      doctorName: doctorName,
    });
    let { currentDate } = this.state;
    this.getPatientData(user.id, currentDate);
  }
  async getPatientData(id, currentDate) {
    let date = new Date(currentDate).getTime();
    console.log(id);
    console.log(currentDate);
    let res = await handleGetListPatientForDoctorService(id, date);
    if (res && res.errCode === 0) {
      this.setState({
        currentDate: date,
        patientData: res.data,
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnchangeDate = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        this.getPatientData(user.id, currentDate);
        console.log(this.state.patientData);
      }
    );
  };
  handleConfirm(item) {
    let data = {
      language: this.state.language,
      doctorId: item.doctorId,
      doctorName: this.state.doctorName,
      patientId: item.patientId,
      patientName: item.patientData.lastName,
      patientEmail: item.patientData.email,
      date: this.state.currentDate,
    };
    let copyState = { ...this.state };
    copyState.remedyData = data;
    copyState.isShowRemedyModal = !this.state.isShowRemedyModal;
    this.setState(copyState);
    console.log(item);
  }
  sendRemedy = async (data) => {
    data.currentDate = this.state.currentDate;
    let remedyRespone = await handleSendRemedyService(data);
    if (remedyRespone && remedyRespone.errCode === 0) {
      toast.success(remedyRespone.errMessage);
      this.getPatientData(
        this.state.remedyData.doctorId,
        this.state.currentDate
      );
      this.toggle();
    } else {
      toast.error(remedyRespone.errMessage);
    }
  };
  toggle = () => {
    this.setState({
      isShowRemedyModal: !this.state.isShowRemedyModal,
    });
  };
  render() {
    let { patientData } = this.state;
    console.log(patientData);
    return (
      <>
        <div className="manage-patient-container">
          <div className="title text-center py-3">
            <h2>Quản Lý Bệnh Nhân</h2>
          </div>
          <div className="manage-patient-body">
            <div className="row">
              <div className="col-4 form-group">
                <label>Chọn ngày:</label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleOnchangeDate}
                  value={this.state.currentDate}
                  minDate={
                    new Date(new Date().setDate(new Date().getDate() - 1))
                  }
                />
              </div>
            </div>

            <table className="table thead-dark text-center ">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Time</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patientData &&
                  patientData.length > 0 &&
                  patientData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{(index += 1)}</td>
                        <td>{item.timeTypeDataPatient.valueVi}</td>
                        <td>{item.patientData.lastName}</td>
                        <td>{item.patientData.email}</td>
                        <td>{item.patientData.gender}</td>
                        <td>{item.patientData.address}</td>
                        <td>{item.patientData.phonenumber}</td>
                        <td>
                          <button
                            className="btn btn-secondary mr-2"
                            onClick={() => this.handleConfirm(item)}
                          >
                            Xác nhận
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.isShowRemedyModal && (
          <RemedyModal
            isShowRemedyModal={this.state.isShowRemedyModal}
            remedyData={this.state.remedyData}
            sendRemedy={this.sendRemedy}
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
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
