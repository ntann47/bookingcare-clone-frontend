import React, { Component } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import "./ManageSpecialty.scss";
import { handleCreateNewSpecialtyService } from "../../../../services/userService";
import { CommonUtils } from "../../../../utils";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();
// Initialize a markdown parser

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  async componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}

  /*
Life cycle
* Run component
1. Run constructor -> init state
2. Did mount (gán giá trị cho state setState)
3 Render
*/
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        image: base64,
      });
    }
  };
  handleSaveNewSpecialty = async () => {
    console.log(this.state);
    let respone = await handleCreateNewSpecialtyService(this.state);
    if (respone && respone.errCode === 0) {
      toast.success("Successfull");
    } else {
      toast.error("Error: " + respone.errMessage);
    }
  };
  render() {
    return (
      <div className="manage-specialty-container">
        <h1 className="manage-specialty-title">Quản Lí Chuyên Khoa</h1>

        <button className="btn btn-primary">New</button>

        <div className="manage-specialty-content">
          <div className="row add-specialty">
            <div className="col-6 form-group">
              <label>Tên Chuyên Khoa</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "name")}
                value={this.state.name}
              />
            </div>
            <div className="col-6 form-group">
              <label>Ảnh chuyên khoa</label>
              <input
                type="file"
                className="form-control-file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
          </div>
          <div className="manage-specialty-editor">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
        </div>
        <div className="row col-12"></div>
        <button
          className="btn btn-primary"
          onClick={() => this.handleSaveNewSpecialty()}
        >
          {/* {this.state.hasOldMarkdown === false ? "Lưu" : "Lưu thay đổi"} */}
          Lưu
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
