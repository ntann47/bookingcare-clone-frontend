import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu, menu } from "./menuApp";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { LANGUAGES, ROLE } from "../../utils";
import _ from "lodash";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  componentDidMount() {
    let { userInfo } = this.props;
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === ROLE.ADMIN) {
        this.setState({
          menuApp: adminMenu,
        });
      }
      if (role === ROLE.DOCTOR) {
        this.setState({
          menuApp: doctorMenu,
        });
      }
      // } else {
      //   this.setState({
      //     menuApp: menu,
      //   });
    }
  }
  render() {
    // console.log(this.props);
    const { processLogout, language } = this.props;
    // console.log(this.props);

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="header-right-content">
          {/* nút logout */}
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />{" "}
            {this.props.userInfo && this.props.userInfo.lastName + "!"}
          </span>
          <div className="header-languages">
            <span
              className={
                language === LANGUAGES.EN
                  ? "header-language action"
                  : "header-language"
              }
              // className="header-language action"
              onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
            >
              EN
            </span>
            <span
              className={
                language === LANGUAGES.VI
                  ? "header-language action"
                  : "header-language"
              }
              onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
            >
              VI
            </span>
          </div>
          <div className="btn btn-logout" onClick={processLogout}>
            <FontAwesomeIcon icon={faSignOut} />
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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeSystemLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
