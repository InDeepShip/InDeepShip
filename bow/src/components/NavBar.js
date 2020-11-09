import React, { Component, Fragment } from 'react';
import { generatePath, Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import brandingImg from '../assets/our_flag.png';
import bugReportImg from '../assets/bug_report_white.png';
import signinButton from '../assets/google_signin_blue.png';
import { logout } from '../actions';
import '../styles/NavBar.scss';
import * as ROUTES from '../constants/routes';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class NavBar extends Component {
  state = {
    open: false,
    showBugModal: false,
    bugReportText: ""
  }

  toggle = () => { this.setState({ open: !this.state.open }) };
  close = () => { this.setState({ open: false }) };

  handleLogout = () => {
    this.props.logout()
  }

  openBugModal = () => {
    this.setState({ showBugModal: true });
  }

  closeBugModal = () => {
    this.setState({ showBugModal: false });
  }

  reportBugs() {
    if (typeof (window) !== 'undefined') {
      Modal.setAppElement('body')
    }

    this.setState({
      showBugModal: true
    })
  }

  handleSubmitBugReport() {
    var message = this.state.bugReportText;
    var currentPage = window.location;

    this.setState({
      showBugModal: false
    })
    const response = fetch("http://206.189.218.111/api/bugreport/",
      {
        method: 'POST',
        body: JSON.stringify({
          "message": message,
          "currentPage": currentPage.href
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(response => { console.log(response) });
  }

  handleBugReportText(e) {
    this.setState({
      bugReportText: e.target.value
    });
  }

  renderLoginButton() {
    if (this.props.auth.token) {
      const first_name = this.props.auth.user.name.split(' ')[0];
      const greetings = `Hi, ${first_name}`;
      return (
        <div className="navbar-item has-dropdown is-hoverable">
          <NavLink className="navbar-link" to={`/profile/${this.props.auth.cruzid}`}>
            {greetings}
          </NavLink>
          <div className="navbar-dropdown is-right is-boxed">
            <Link className="navbar-item" to={`/profile/${this.props.auth.cruzid}`}>
              Profile
              </Link>
            <Link className="navbar-item" to="/settings">
              Settings
              </Link>
            <hr className="navbar-divider" />
            <a className="navbar-item" href="" onClick={this.handleLogout}>
              Logout
            </a>
          </div>
        </div>
      );
    }
  }

  renderGoogleAuth() {
    if (!this.props.auth) {
      return (
        <div className="navbar-item">
          <a href="/auth/google" className="has-text-centered">
            <button
              style={{
                background: `url("${signinButton}")`, backgroundSize: 'cover', width: 196, height: 46, border: 'none', display: 'inline-block'
              }}
              className="button"
              onClick={this.signIn}
              title="Sign In"
            />
          </a>
        </div>
      );
    }
  }

  renderUnauth() {
    if (!this.props.auth.token) {
      return (
        <Fragment>
          <NavLink className="navbar-item" to={ROUTES.LOGIN}>
            Log In
          </NavLink>
          <NavLink className='navbar-item' to={ROUTES.SIGN_UP}>
            Sign Up
          </NavLink>
        </Fragment>
      );
    }
  }

  render() {
    const { open } = this.state;

    return (
      <nav className={`navbar is-spaced is-fixed-top is-primary`}>
        <div className="container">
          <div className='navbar-brand'>
            <Link to={ROUTES.LANDING} className='navbar-item-2'>
              <img className='navbar-item-2' src={brandingImg} alt="Logo" />
            </Link>
            <div
              className={`navbar-burger burger ${open ? 'is-active' : ''}`}
              onClick={this.toggle}
              role="button"
              tabIndex="0"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className={`navbar-menu ${open ? 'is-active' : ''}`}>
            <div className='navbar-start'>
              <NavLink className='navbar-item' to={ROUTES.ORGANIZATION}>
                Organization
              </NavLink>
              <NavLink className='navbar-item' to={ROUTES.SERVICES}>
                Services
              </NavLink>
              <NavLink className='navbar-item' to={ROUTES.POLICY}>
                Policy
              </NavLink>
              <NavLink className='navbar-item' to={ROUTES.CONTACT_US}>
                Contact Us
              </NavLink>
            </div>
            <div className='navbar-end'>
              {this.renderUnauth()}
              {this.renderLoginButton()}
              <button className="button is-danger navbar-item" href={'#' + this.props.match.url} onClick={() => this.reportBugs()}>
                Report a bug
              </button>
            </div>

            <Modal isOpen={this.state.showBugModal} contentLabel="bugReport" style={customStyles} >
              <div className="bugReportForm">
                <a align="center" href={'#' + this.props.match.url} >Please provide a brief description of the bug:</a>
                <br /><br />
                <textarea align="center" cols="50" rows="10" type='text' onChange={(e) => this.handleBugReportText(e)} />
                <br /><br />
                <div align="center">
                  <button type="button" onClick={() => this.handleSubmitBugReport()} className="button is-warning is-link">Accept</button>
                &nbsp;&nbsp;
                <button type="button" onClick={() => this.closeBugModal()} className="button is-warning is-link">Close</button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </nav >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
);
