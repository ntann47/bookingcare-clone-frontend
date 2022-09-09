import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import {
  editUserService,
  handleCreateNewUser,
  handleDeleteUser,
  handleGetAllUser,
} from "../../services/userService";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModelEditUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userEdit: {},
      isOpenModal: false,
      isOpenModalEditUser: false,
    };
  }
  async componentDidMount() {
    await this.getAllUserFromReact();
  }
  getAllUserFromReact = async () => {
    let res = await handleGetAllUser("ALL");
    if (res && res.errCode === 0) {
      this.setState({ users: res.users });
    }
  };

  /*
Life cycle
* Run component
1. Run constructor -> init state
2. Did mount (gán giá trị cho state setState)
3 Render
*/
  handleAddNewUser = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
    // console.log(this.state.isOpenModal)
  };
  toggle = () => {
    this.setState({ isOpenModal: !this.state.isOpenModal });
  };
  toggleEditUser = () => {
    this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
  };
  createNewUser = async (data) => {
    try {
      let result = await handleCreateNewUser(data);
      if (result.errCode !== 0) {
        alert(result.errMessage);
      } else {
        this.setState({ isOpenModal: false });
        this.getAllUserFromReact();
      }
    } catch (err) {
      console.log(err);
    }
  };
  handleDeleteUserReact = async (user) => {
    try {
      let result = await handleDeleteUser(user.id);
      this.getAllUserFromReact();
      alert(result.errMessage);
    } catch (err) {
      console.log(err);
    }
  };
  handleEditUserReact = (user) => {
    console.log("edit user", user.email);
    this.setState({
      userEdit: user,
      isOpenModalEditUser: true,
    });
  };
  editUserFromReact = async (user) => {
    let result = await editUserService(user)
    alert(result.errMessage);
    try{
      if(result.errCode !== 0){
        alert(result.errMessage);
      }else{
        this.setState({ isOpenModalEditUser: false });
        this.getAllUserFromReact();
      }

    }catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="users-container">
        <ModalUser
          isOpenModal={this.state.isOpenModal}
          toggle={this.toggle}
          className="modal-user"
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && 
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggle={this.toggleEditUser}
            className="modal-user"
            userEdit={this.state.userEdit}
            handleEditUser = {this.editUserFromReact}
          />
        }

        <h1 className="text-center">Manage users</h1>

        <div className="container">
          <div className="mx-1">
            <button
              className="btn btn-primary px-3 mb-1"
              onClick={this.handleAddNewUser}
            >
              {" "}
              <FontAwesomeIcon icon={faPlus} className="px-1" />
              Add a new user
            </button>
          </div>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>id</th>
                <th>email</th>
                <th>firstName</th>
                <th>lastName</th>
                <th>address</th>
                <th>phonenumber</th>
                <th>gender</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users &&
                this.state.users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.address}</td>
                      <td>{user.phonenumber}</td>
                      <td>{user.gender}</td>
                      <td>
                        <button
                          type="button"
                          className=""
                          onClick={() => {
                            this.handleEditUserReact(user);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          type="button"
                          className=""
                          onClick={() => {
                            this.handleDeleteUserReact(user);
                          }}
                        >
                          <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
