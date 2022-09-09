import React, { Component } from "react";
import { Redirect, withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SpecialtyDetail.scss";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import HeaderHome from "../../HomePage/HeaderHome";
import HomeFooter from "../../HomePage/Sections/HomeFooter";
import DoctorProfile from "../Doctors/DoctorProfile";
import DoctorSchedule from "../Doctors/DoctorSchedule";
import DoctorExtraInfo from "../Doctors/DoctorExtraInfo";
import {
  getAllCodeService,
  handleGetDoctorDetailByIdService,
  handleGetSpecialtyDetailByIdService,
} from "../../../services/userService";

class SpecialtyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionHTML: "",
      descriptionMarkdown: "",
      listDoctor: [],
      listProvince: [],
      isShowAllDescription: false,
      currentSpecialtyId: "",
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let specialtyId = this.props.match.params.id;
      let provincesRes = await getAllCodeService("PROVINCE");
      if (provincesRes && provincesRes.errCode === 0) {
        if (provincesRes.data.length > 0) {
          provincesRes.data.unshift({
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "All",
            valueVi: "Toàn quốc",
          });
        }
        this.setState({
          currentSpecialtyId: specialtyId,
          listProvince: provincesRes.data ? provincesRes.data : [],
        });
        this.getSpecialtyDetailById(this.state.currentSpecialtyId, "ALL");
      }
    }
  }

  getSpecialtyDetailById = async (specialtyId, location) => {
    let res = await handleGetSpecialtyDetailByIdService(specialtyId, location);
    if (res && res.errCode === 0) {
      let copyState = { ...this.state };
      copyState.descriptionHTML = res.data.descriptionHTML;
      copyState.descriptionMarkdown = res.data.descriptionMarkdown;
      copyState.listDoctor = res.data.specialtyDoctors;
      this.setState(copyState);
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnChangeSelect = async (event) => {
    this.getSpecialtyDetailById(
      this.state.currentSpecialtyId,
      event.target.value
    );
  };
  /*
Life cycle
* Run component
1. Run constructor -> init state
2. Did mount (gán giá trị cho state setState)
3 Render
*/
  handleOnChangeShowDescription = () => {
    let copyState = { ...this.state };
    copyState.isShowAllDescription = !copyState.isShowAllDescription;
    this.setState(copyState);
  };
  render() {
    let { listDoctor, listProvince } = this.state;
    return (
      <>
        <HeaderHome isShowBanner={false} />

        <div className="specialty-detail-container">
          <div className="specialty-detail-content">
            {this.state.isShowAllDescription === false ? (
              <div className="specialty-description-container-s">
                <div className="specialty-description">
                  <div
                    className="specialty-detail-description-text"
                    dangerouslySetInnerHTML={{
                      __html: this.state.descriptionHTML,
                    }}
                  ></div>
                  <div
                    className="specialty-doctor-description-action"
                    onClick={this.handleOnChangeShowDescription}
                  >
                    Xem thêm
                  </div>
                </div>
              </div>
            ) : (
              <div className="specialty-description-container-lg">
                <div className="specialty-description">
                  <div
                    className="specialty-detail-description-text"
                    dangerouslySetInnerHTML={{
                      __html: this.state.descriptionHTML,
                    }}
                  ></div>
                  <div
                    className="specialty-doctor-description-action"
                    onClick={this.handleOnChangeShowDescription}
                  >
                    Thu gọn
                  </div>
                </div>
              </div>
            )}
            <div className="specialty-doctors-container">
              <div className="specialty-doctors-filter">
                <select onChange={(event) => this.handleOnChangeSelect(event)}>
                  {listProvince &&
                    listProvince.length > 0 &&
                    listProvince &&
                    listProvince.length > 0 &&
                    listProvince.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.valueVi}
                        </option>
                      );
                    })}
                </select>
              </div>
              {listDoctor &&
                listDoctor.length > 0 &&
                listDoctor.map((item, index) => {
                  return (
                    <div className="specialty-doctor-container" key={index}>
                      <div className="specialty-doctor">
                        <div className="specialty-doctor-description">
                          <DoctorProfile
                            doctorId={item.doctorId}
                            isShowDescription={true}
                          />
                        </div>
                        <div className="specialty-doctor-content">
                          <div className="specialty-doctor-schedule">
                            <DoctorSchedule doctorId={item.doctorId} />
                          </div>

                          <div className="specialty-doctor-extra">
                            <DoctorExtraInfo doctorId={item.doctorId} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
