import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginAPI } from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "ntann47@gmail.com",
      password: "12345",
      error: false,
      errMess: "",
    };
  }
  handleOnChanePass = (event) => {
    this.setState({ email: event.target.value });
  };
  handleLogin = async () => {
    let data = {
      email: this.state.email,
      password: this.state.password,
    };
    try {
      let result = await handleLoginAPI(data);
      console.log(result);
      if (result.errCode !== 0) {
        this.setState({
          errMess: result.errMessage,
          error: true
        });
      }
      else{
        this.props.userLoginSuccess(result.user);
        this.setState({
          error: false
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-content row">
          <h1 className="login-title">Login</h1>
          <div className="login-form col-md-3">
            <div className=" form-group">
              <label>email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={(event) => {
                  this.handleOnChanePass(event);
                }}
              />
            </div>
            <div className=" form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
              />
            </div>
            <div className="form-group error-message">
              <label>{this.state.error && this.state.errMess}</label>
            </div>
            <div className="col-md-3 ">
              <button
                className="btn btn-primary login-btn"
                onClick={this.handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
    // adminLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)), 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
