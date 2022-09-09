import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ButtonMore.scss";
import "../Sections/Speciality.scss";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
class ButtonMore extends Component {
  render() {
    let className = this.props.className;
    className = "button " + className;
    return <button className={className}>Xem thêm</button>;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonMore);
