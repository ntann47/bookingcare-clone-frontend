import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalUser.scss";
import _ from "lodash";
class ModalEditUser extends React.Component {
  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      gender: "",
      roleId: "",
    };
  }
  componentDidMount() {
   
    let user = this.props.userEdit;
    //let {userEdit} = this.props
    console.log(user);
    if (user && !_.isEmpty(user)) {
      this.setState({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phonenumber: user.phonenumber,
        gender: "",
        roleId: "",
      });
    }
  }
  handleOnChangeInput = (event, id) => {
    // console.log(event.target.value);
    let state = { ...this.state };
    state[id] = event.target.value;
    this.setState({
      ...state,
    });
    console.log(this.state);
  };
  checkValidInput = () => {
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        alert("Missing parameter: " + arrInput[i]);
        return false;
      }
    }
    return true;
  };
    handleUpdateUser = () => {
      console.log("data", this.state);
      let isValid = this.checkValidInput();
      if (isValid) {
        this.props.handleEditUser(this.state)
      }
    };

  render() {
    // console.log(this.props);
    return (
      <div>
        <Button
          color="danger"
          onClick={() => {
            this.toggle();
          }}
        >
          {this.props.buttonLabel}
        </Button>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => {
            this.props.toggle();
          }}
          className={this.props.className}
          centered
          size="lg"
        >
          <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
          <ModalBody>
            {/* <div className="container"> */}
            <div className="row">
              <div className="form-group col-md-6">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                  value={this.state.email}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "password");
                  }}
                  value={this.state.password}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "firstName");
                  }}
                  value={this.state.firstName}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "lastName");
                  }}
                  value={this.state.lastName}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                  value={this.state.address}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phonenumber"
                  placeholder="Phone Number"
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phonenumber");
                  }}
                  value={this.state.phonenumber}
                />
              </div>
            </div>
            {/* <div className="row">
              <div className="form-group col-md-3">
                <label>Giới tính:</label>
                <select name="gender" id="" className="form-control">
                  <option value="1" class="value">
                    Male
                  </option>
                  <option value="0" class="value">
                    Female
                  </option>
                </select>
              </div>
              <div class="form-group col-md-3">
                <label>Role:</label>
                <select name="roleId" id="" class="form-control">
                  <option value="1" class="value">
                    Admin
                  </option>
                  <option value="2" class="value">
                    Doctor
                  </option>
                  <option value="3" class="value">
                    Patient
                  </option>
                </select>
              </div> */}
            {/* </div> */}
            {/* </div> */}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleUpdateUser}>
             Save Changes
            </Button>{" "}
            {/* <button class="btn btn-primary mt-3"> Register</button> */}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalEditUser;
