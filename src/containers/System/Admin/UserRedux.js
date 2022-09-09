import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils/constant";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./UserRedux.scss";
import { CommonUtils } from "../../../utils";
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genders: [],
      roles: [],
      positions: [],
      previewImgUrl: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      profileImg: "",
      action: CRUD_ACTIONS.CREATE,
    };
  }
  componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genders: this.props.genderRedux,
        gender:
          this.props.genderRedux && this.props.genderRedux.length > 0
            ? this.props.genderRedux[0].keyMap
            : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positions: this.props.positionRedux,
        position:
          this.props.positionRedux && this.props.positionRedux.length > 0
            ? this.props.positionRedux[0].keyMap
            : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roles: this.props.roleRedux,
        role:
          this.props.roleRedux && this.props.roleRedux.length > 0
            ? this.props.roleRedux[0].keyMap
            : "",
      });
      if (prevProps.users !== this.props.users) {
        this.resetState();
      }
    }
  }
  resetState = () => {
    this.setState({
      previewImgUrl: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      address: "",
      gender:
        this.props.genderRedux && this.props.genderRedux.length > 0
          ? this.props.genderRedux[0].keyMap
          : "",
      position:
        this.props.positionRedux && this.props.positionRedux.length > 0
          ? this.props.positionRedux[0].keyMap
          : "",
      role:
        this.props.roleRedux && this.props.roleRedux.length > 0
          ? this.props.roleRedux[0].keyMap
          : "",
      profileImg: "",
      action: CRUD_ACTIONS.CREATE,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log(base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        profileImg: base64,
      });
    }
  };
  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log(copyState);
      }
    );
  };
  handleSaveUser = async () => {
    let action = this.state.action;
    let res = this.checkValidateInput();
    if (res === false) {
      return;
    }

    if (action === CRUD_ACTIONS.CREATE) {
      await this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        image: this.state.profileImg,
        roleId: this.state.role,
        positionId: this.state.position,
      });
    } else {
      await this.props.editUser({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phonenumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        image: this.state.profileImg,
      });
    }
    this.resetState();
    await this.props.fetchAllUsers();
  };
  checkValidateInput = () => {
    let arrToCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phonenumber",
      "address",
    ];
    let isValid = true;
    for (let i = 0; i < arrToCheck.length; i++) {
      if (!this.state[arrToCheck[i]]) {
        isValid = false;
        alert("Missing required field: " + arrToCheck[i]);
        break;
      }
    }
    return isValid;
  };
  handleEditUser = (user) => {
    let profileImg = "";
    if (user.image) {
      profileImg = Buffer.from(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "password",
      firstName: user.firstName,
      lastName: user.lastName,
      phonenumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      image: "",
      previewImgUrl: profileImg,
      action: CRUD_ACTIONS.EDIT,
    });
  };
  handleCancel = () => {
    this.resetState();
  };
  render() {
    return (
      <div className="user-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user.add" />
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => {
                    this.onChangeInput(event, "email");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.password" />
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.password}
                  onChange={(event) => {
                    this.onChangeInput(event, "password");
                  }}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.first-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.firstName}
                  onChange={(event) => {
                    this.onChangeInput(event, "firstName");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.last-name" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.lastName}
                  onChange={(event) => {
                    this.onChangeInput(event, "lastName");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.phonenumber}
                  onChange={(event) => {
                    this.onChangeInput(event, "phonenumber");
                  }}
                />
              </div>
              <div className="col-9">
                <label>
                  <FormattedMessage id="manage-user.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) => {
                    this.onChangeInput(event, "address");
                  }}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.gender" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "gender");
                  }}
                  value={this.state.gender}
                >
                  {this.state.genders &&
                    this.state.genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {this.props.language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.position" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "position");
                  }}
                  value={this.state.position}
                >
                  {this.state.positions &&
                    this.state.positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {this.props.language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.role" />
                </label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.onChangeInput(event, "role");
                  }}
                  value={this.state.role}
                >
                  {this.state.roles &&
                    this.state.roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {this.props.language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.image" />
                </label>
                <div className="load-img-container">
                  <input
                    id="loadImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label htmlFor="loadImg" className="load-img">
                    Load ảnh
                    <FontAwesomeIcon icon={faUpload} className="fa-upload" />
                  </label>

                  <div
                    className="image-view"
                    style={{
                      backgroundImage: `url(${this.state.previewImgUrl})`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="col-12 mt-3 text-center">
                <div className="button-group">
                  <button
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-info btn-save"
                        : "btn btn-primary"
                    }
                    onClick={() => this.handleSaveUser()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.save-changes" />
                    ) : (
                      <FormattedMessage id="manage-user.save" />
                    )}
                  </button>
                  {this.state.action === CRUD_ACTIONS.EDIT && (
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleCancel()}
                    >
                      <FormattedMessage id="manage-user.cancel" />
                    </button>
                  )}
                </div>
              </div>
              <div className="col-12">
                <TableManageUser
                  handleEditUser={this.handleEditUser}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchAllUsers: () => dispatch(actions.fetchAllUserStart()),
    editUser: (user) => dispatch(actions.editUserStart(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
