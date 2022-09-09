import React, { Component } from "react";
import { Redirect } from "react-router";
import NumberFormat from "react-number-format";
import "./DoctorExtraInfo.scss";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import {
  handleGetDoctorScheduleByDateService,
  handleGetMoreDoctorInfoByIdService,
} from "../../../services/userService";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowMorePriceInfo: false,
      moreDoctorInfo: {},
    };
  }
  async componentDidMount() {
    // let { language } = this.props;
    if (this.props.doctorId) {
      let respone = await handleGetMoreDoctorInfoByIdService(
        this.props.doctorId
      );
      if (respone && respone.errCode === 0) {
        this.setState({
          moreDoctorInfo: respone.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let { language } = this.props;
    if (prevProps.doctorId !== this.props.doctorId) {
      let respone = await handleGetMoreDoctorInfoByIdService(
        this.props.doctorId
      );
      if (respone && respone.errCode === 0) {
        this.setState({
          moreDoctorInfo: respone.data,
        });
      }
    }
  }

  /*
Life cycle
* Run component
1. Run constructor -> init state
2. Did mount (gán giá trị cho state setState)
3 Render
*/
  handleChangePriceInfo = () => {
    let copyState = { ...this.state };
    copyState.isShowMorePriceInfo = !this.state.isShowMorePriceInfo;
    this.setState(copyState);
  };

  render() {
    let { language } = this.props;
    let { moreDoctorInfo } = this.state;

    return (
      <div
        className={
          this.props.borderLeft === true
            ? "doctor-extra-container border-left"
            : "doctor-extra-container"
        }
      >
        <div className="content-up">
          <h5 className="address-title">Địa chỉ khám</h5>
          {moreDoctorInfo && moreDoctorInfo.nameClinic && (
            <div className="clinic-name">
              {moreDoctorInfo && moreDoctorInfo.nameClinic}
            </div>
          )}
          {moreDoctorInfo && moreDoctorInfo.addressClinic && (
            <div className="clinic-address">
              {moreDoctorInfo && moreDoctorInfo.addressClinic}
            </div>
          )}
        </div>
        <div className="content-down">
          <div className="price-container">
            {this.state.isShowMorePriceInfo === false ? (
              <div className="price-content-hidden">
                <div>
                  <span className="price-title">Giá khám:</span>
                  {moreDoctorInfo && moreDoctorInfo.priceTypeData && (
                    <span className="price-inline">
                      {moreDoctorInfo && language === LANGUAGES.VI ? (
                        <NumberFormat
                          value={
                            moreDoctorInfo.priceTypeData
                              ? moreDoctorInfo.priceTypeData.valueVi
                              : ""
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"đ"}
                        />
                      ) : (
                        <NumberFormat
                          value={
                            moreDoctorInfo.priceTypeData
                              ? moreDoctorInfo.priceTypeData.valueEn
                              : ""
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                        />
                      )}
                    </span>
                  )}
                  <span
                    className="hide-price"
                    onClick={this.handleChangePriceInfo}
                  >
                    Xem chi tiết
                  </span>
                </div>
              </div>
            ) : (
              <div className="price-content-showed">
                <div className="price-title">Giá khám:</div>
                <div className="price-wrap">
                  <div className="price-content">
                    <div className="price-title-wrap">
                      <div className="price-label">Giá khám:</div>
                      {moreDoctorInfo && language === LANGUAGES.VI ? (
                        <NumberFormat
                          value={
                            moreDoctorInfo.priceTypeData
                              ? moreDoctorInfo.priceTypeData.valueVi
                              : ""
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"đ"}
                        />
                      ) : (
                        <NumberFormat
                          value={
                            moreDoctorInfo.priceTypeData
                              ? moreDoctorInfo.priceTypeData.valueEn
                              : ""
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                        />
                      )}
                    </div>
                    <div className="price-description">
                      Được ưu tiên khám trước khi đặt khám qua BookingCare
                    </div>
                  </div>

                  {/* Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt
                    và quẹt thẻ */}
                  {moreDoctorInfo && moreDoctorInfo.note && (
                    <div className="content-down-message">
                      {moreDoctorInfo.note}
                    </div>
                  )}
                </div>
                <div
                  className="hide-price"
                  onClick={this.handleChangePriceInfo}
                >
                  Ẩn bảng giá
                </div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
