import React, { Component } from "react";
import { Redirect } from "react-router";
import NumberFormat from "react-number-format";
import "./VerifyEmail.scss";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HeaderHome from "../../HomePage/HeaderHome";
import { LANGUAGES } from "../../../utils";
import { handlePostVerifyBookAppointment } from "../../../services/userService";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerifiedSuccess: false,
      errCode: "",
    };
  }
  async componentDidMount() {
    // let { language } = this.props;
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await handlePostVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          isVerifiedSuccess: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          isVerifiedSuccess: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let { language } = this.props;
    if (prevProps.doctorId !== this.props.doctorId) {
    }
  }

  /*
Life cycle
* Run component
1. Run constructor -> init state
2. Did mount (gán giá trị cho state setState)
3 Render
*/

  render() {
    return (
      <div className="verify-container">
        <HeaderHome isShowBanner={false} />
        {this.state.isVerifiedSuccess === false ? (
          <div>Vui lòng chờ...</div>
        ) : +this.state.errCode === 0 ? (
          <div>Xác nhận lịch khám thành công</div>
        ) : (
          <div>Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
