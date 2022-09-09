import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { fetchAllUserStart, deleteUserStart } from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import "./TableManageUser.scss";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userEdit: {},
    };
  }
  componentDidMount() {
    this.props.fetchAllUsers();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        users: this.props.users,
      });
    }
  }
  handleDeleteUser = async (userId) => {
    await this.props.deleteUser(userId);
    await this.props.fetchAllUsers();
  };
  handleEditUser = (user) => {
    // console.log(user);
    this.props.handleEditUser(user);
  };

  /*
Life cycle
* Run component
1. Run constructor -> init state
2. Did mount (gán giá trị cho state setState)
3 Render
*/

  //   toggle = () => {
  //     this.setState({ isOpenModal: !this.state.isOpenModal });
  //   };
  //   toggleEditUser = () => {
  //     this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
  //   };

  render() {
    console.log(this.props.users);
    return (
      <>
        <div className="users-container">
          <div className="container">
            <div className="mx-1"></div>
            <table className="table thead-dark text-center">
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
                  this.state.users.length > 0 &&
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
                            className="btn btn-primary mx-3"
                            onClick={() => {
                              this.handleEditUser(user);
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              this.handleDeleteUser(user.id);
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
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUserStart()),
    deleteUser: (userId) => dispatch(deleteUserStart(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
