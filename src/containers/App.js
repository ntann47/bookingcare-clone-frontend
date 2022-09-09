import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./HomePage/HomePage";
import DoctorDetail from "./Patient/Doctors/DoctorDetail";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Login from "../containers/Auth/Login";
import Header from "./Header/Header";
import System from "../routes/System";
import Doctor from "../routes/Doctor";
import ConfirmModal from "../components/ConfirmModal";
import VerifyEmail from "./Patient/Verify/VerifyEmail";
import SpecialtyDetail from "./Patient/Specialty/SpecialtyDetail";
import ClinicDetail from "./Patient/Clinics/ClinicDetail";
toast.configure();
class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <ConfirmModal />
            {/* {this.props.isLoggedIn && <Header />} */}

            <div className="content-container">
              <Switch>
                <Route path={path.HOME} exact component={Home} />
                <Route
                  path={path.LOGIN}
                  component={userIsNotAuthenticated(Login)}
                />
                <Route
                  path={path.SYSTEM}
                  component={userIsAuthenticated(System)}
                />
                <Route
                  path={"/doctor"}
                  component={userIsAuthenticated(Doctor)}
                />
                <Route path={path.HOMEPAGE} component={HomePage} />
                <Route path={path.DETAIL_DOCTOR} component={DoctorDetail} />
                <Route path={path.VERIFY_EMAIL} component={VerifyEmail} />
                <Route
                  path={path.SPECIALTY_DETAIL}
                  component={SpecialtyDetail}
                />
                <Route path={path.CLINIC_DETAIL} component={ClinicDetail} />
              </Switch>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
