import React, { Component, Fragment } from 'react';
import { generatePath, Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import brandingImg from '../assets/our_flag.png';
// import brandingImg from '../assets/logo.svg';
import bugReportImg from '../assets/bug_report_white.png';
import signinButton from '../assets/google_signin_blue.png';
import { logout } from '../actions';
import '../styles/NavBar.scss';
import * as ROUTES from '../constants/routes';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      open: false,
      showBugModal: false,
      bugReportText: ""
    }
    // ref to textbox in footer
    this.textboxRef = this.props.textboxRef
  }

  toggle = () => { this.setState({ open: !this.state.open }) };
  close = () => { this.setState({ open: false }) };

  // set ref to div that wraps nav
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  // Close navbar if clicked outside
  handleClickOutside(event) {
    console.log("click outside!")
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.close()
    }
  }


  // scroll to feedback textbox
  handleClickOnFeedback = (event) => {
    // check that element has rendered
    if (this.textboxRef.current) {
      this.textboxRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      })
    }
  }

  handleLogout = () => {
    this.props.logout()
  }
  renderLoginButton() {
    if (this.props.auth.token) {
      const first_name = this.props.auth.user.name.split(' ')[0];
      const greetings = `Hi, ${first_name}`;
      return (
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            {greetings}
          </a>
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

  // Checks if current size is < 1024px
  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        isMobile: window.innerWidth < 1024
      });
    }, false);

    // Check if clicked outside
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const { open } = this.state;
    const className = this.state.isMobile ? 'container-fluid' : 'container';

    return (
      <div ref={this.setWrapperRef}>
        <nav className={`navbar is-fixed-top is-primary`}>
          <div className={className}>
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
                <div className="navbar-item">
                  <button id="give-feedback-selector" className="button is-danger navbar-item" onClick={this.handleClickOnFeedback}>
                    Give Feedback
              </button>
                </div>
              </div>
            </div>
          </div>
        </nav >
      </div>
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
