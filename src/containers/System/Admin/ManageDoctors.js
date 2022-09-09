import React, { Component } from "react";
import Select from "react-select";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctors.scss";
import {
  fetchAllDoctorsStart,
  fetchRequireDoctorInfoStart,
  saveDoctorInfoStart,
} from "../../../store/actions";
import { handleGetDoctorDetailByIdService } from "../../../services/userService";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
      allDoctors: [],
      hasOldMarkdown: false,

      allPrices: [],
      selectedPrice: "",
      allPayments: [],
      selectedPayment: "",
      allProvinces: [],
      selectedProvince: "",
      clinicName: "",
      clinicAddress: "",
      note: "",
      clinicId: "",
      allClinics: [],
      selectedClinic: "",
      specialtyId: "",
      allSpecialties: [],
      selectedSpecialty: "",
    };
  }
  async componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getRequireDoctorInfo();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors.length !== this.props.allDoctors.length) {
      let doctors = this.buildDataInputSelect(this.props.allDoctors, "DOCTORS");
      this.setState({
        allDoctors: doctors,
      });
    }
    if (prevProps.language !== this.props.language) {
      let doctors = this.buildDataInputSelect(this.props.allDoctors, "DOCTORS");
      this.setState({
        allDoctors: doctors,
      });
    }
    if (prevProps.requireInfo !== this.props.requireInfo) {
      let { prices, payments, provinces, specialties, clinics } =
        this.props.requireInfo;
      let selectPriceData = this.buildDataInputSelect(prices);
      let selectPaymentData = this.buildDataInputSelect(payments);
      let selectProvinceData = this.buildDataInputSelect(provinces);
      let selectSpecialtyData = this.buildDataInputSelect(
        specialties,
        "SPECIALTY"
      );
      let selectClinicData = this.buildDataInputSelect(clinics, "CLINIC");
      this.setState({
        allPrices: selectPriceData,
        allPayments: selectPaymentData,
        allProvinces: selectProvinceData,
        allSpecialties: selectSpecialtyData,
        allClinics: selectClinicData,
      });
    }
  }

  /*
Life cycle
* Run component
1. Run constructor -> init state
2. Did mount (gán giá trị cho state setState)
3 Render
*/
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (inputData.length > 0) {
      for (let i = 0; i < inputData.length; i++) {
        let object = {};
        if (type === "SPECIALTY" || type === "CLINIC") {
          object.label = inputData[i].name;
          object.value = inputData[i].id;
        } else if (!type || type === "DOCTORS") {
          let labelVi =
            type === "DOCTORS"
              ? `${inputData[i].firstName} ${inputData[i].lastName}`
              : inputData[i].valueVi;
          let labelEn =
            type === "DOCTORS"
              ? `${inputData[i].lastName} ${inputData[i].firstName}`
              : inputData[i].valueEn;
          object.label =
            this.props.language === LANGUAGES.VI ? labelVi : labelEn;
          object.value =
            type === "DOCTORS" ? inputData[i].id : inputData[i].keyMap;
        }

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
    let respone = await handleGetDoctorDetailByIdService(selectedDoctor.value);

    if (respone && respone.errCode === 0 && respone.data.Markdown) {
      let provinceId = "",
        provinceSelectedItem = "",
        paymentSelectedItem = "",
        priceSelectedItem = "",
        paymentId = "",
        priceId = "",
        addressClinic = "",
        nameClinic = "",
        note = "",
        specialtyId = "",
        clinicId = "",
        specialtySelectedItem = "",
        clinicSelectedItem = "";
      let markdown = respone.data.Markdown;
      if (respone.data.Doctor_Info) {
        console.log(respone.data.Doctor_Info);
        console.log(this.props.requireInfo);
        provinceId = respone.data.Doctor_Info.provinceId;
        provinceSelectedItem = this.state.allProvinces.find((item) => {
          if (item.value === provinceId) return item;
        });
        paymentId = respone.data.Doctor_Info.paymentId;
        paymentSelectedItem = this.state.allPayments.find((item) => {
          if (item.value === paymentId) return item;
        });
        priceId = respone.data.Doctor_Info.priceId;
        priceSelectedItem = this.state.allPrices.find((item) => {
          console.log(item);
          if (item.value === priceId) return item;
        });
        specialtyId = respone.data.Doctor_Info.specialtyId;
        specialtySelectedItem = this.state.allSpecialties.find((item) => {
          console.log(item);
          if (item.value === specialtyId) return item;
        });
        clinicId = respone.data.Doctor_Info.clinicId;
        clinicSelectedItem = this.state.allClinics.find((item) => {
          console.log(item);
          if (item.value === clinicId) return item;
        });
        console.log(provinceSelectedItem);
        addressClinic = respone.data.Doctor_Info.addressClinic;
        nameClinic = respone.data.Doctor_Info.nameClinic;
        note = respone.data.Doctor_Info.note;
      }
      this.setState({
        hasOldMarkdown: true,
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        clinicAddress: addressClinic,
        clinicName: nameClinic,
        note: note,
        selectedProvince: provinceSelectedItem,
        selectedPayment: paymentSelectedItem,
        selectedPrice: priceSelectedItem,
        selectedSpecialty: specialtySelectedItem,
        selectedClinic: clinicSelectedItem,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldMarkdown: false,
        clinicAddress: "",
        clinicName: "",
        note: "",
        selectedProvince: "",
        selectedPayment: "",
        selectedPrice: "",
        selectedClinic: "",
        selectedSpecialty: "",
      });
    }
  };
  handleSelectDoctorInfo = async (selectedOption, name) => {
    let stateName = name;
    let copyState = { ...this.state };
    copyState[stateName] = selectedOption;
    this.setState({
      ...copyState,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  handleSaveContentMarkdown() {
    console.log(this.state);
    this.props.saveDoctorInfo({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action:
        this.state.hasOldMarkdown === true
          ? CRUD_ACTIONS.EDIT
          : CRUD_ACTIONS.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      clinicName: this.state.clinicName,
      clinicAddress: this.state.clinicAddress,
      note: this.state.note,
      specialtyId: this.state.selectedSpecialty.value,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : " ",
    });
  }
  handleOnChangeText = (event, id) => {
    let stateName = id;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    return (
      <div className="manage-doctors-container">
        <h1 className="manage-doctors-title">Thêm Thông Tin Bác Sĩ</h1>
        <button
          className="btn btn-primary btn-save"
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {this.state.hasOldMarkdown === false ? "Lưu" : "Lưu thay đổi"}
        </button>
        <div className="doctors-description-container">
          <div className="col-4 form-group doctors-selection">
            <label className="">Chọn Bác Sĩ:</label>
            <Select
              className="doctors-description-control doctor-selection"
              value={this.state.selectedDoctor}
              onChange={(selectedDoctor) =>
                this.handleSelectChange(selectedDoctor)
              }
              options={this.state.allDoctors}
            />
          </div>
          <div className="col-8 form-group doctors-description">
            <label className="">Mô tả:</label>
            <textarea
              className="form-control doctors-description-control"
              rows="2"
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="row form-group doctor-more-info">
          <div className="col-4 form-group">
            <label>Chọn tỉnh thành:</label>
            <Select
              className=""
              value={this.state.selectedProvince}
              onChange={(selectedProvince) =>
                this.handleSelectDoctorInfo(
                  selectedProvince,
                  "selectedProvince"
                )
              }
              options={this.state.allProvinces}
            />
          </div>
          <div className="col-4 form-group">
            <label>Tên phòng khám:</label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "clinicName")}
              value={this.state.clinicName}
            />
          </div>
          <div className="col-4 form-group">
            <label>Địa chỉ phòng khám:</label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "clinicAddress")
              }
              value={this.state.clinicAddress}
            />
          </div>
          <div className="col-4 form-group">
            <label>Ghi chú:</label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn giá khám:</label>
            <Select
              className=""
              value={this.state.selectedPrice}
              onChange={(selectedPrice) =>
                this.handleSelectDoctorInfo(selectedPrice, "selectedPrice")
              }
              options={this.state.allPrices}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn phương thức thanh toán:</label>
            <Select
              className=""
              value={this.state.selectedPayment}
              onChange={(selectedPayment) =>
                this.handleSelectDoctorInfo(selectedPayment, "selectedPayment")
              }
              options={this.state.allPayments}
              placeholder={"Chọn phương thức thanh toán"}
              name="selectedPayment"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label>Chọn chuyên khoa</label>
            <Select
              className=""
              value={this.state.selectedSpecialty}
              onChange={(selectedSpecialty) =>
                this.handleSelectDoctorInfo(
                  selectedSpecialty,
                  "selectedSpecialty"
                )
              }
              options={this.state.allSpecialties}
              name="selectedSpecialty"
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn phòng khám</label>
            <Select
              className=""
              value={this.state.selectedClinic}
              onChange={(selectedClinic) =>
                this.handleSelectDoctorInfo(selectedClinic, "selectedClinic")
              }
              options={this.state.allClinics}
              name="selectedClinic"
            />
          </div>
        </div>
        <div className="manage-doctors-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    requireInfo: state.admin.requireInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(fetchAllDoctorsStart()),
    saveDoctorInfo: (data) => dispatch(saveDoctorInfoStart(data)),
    getRequireDoctorInfo: () => dispatch(fetchRequireDoctorInfoStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctors);
