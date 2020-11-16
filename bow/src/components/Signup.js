import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ourFlag from '../assets/our_flag.png';
import { authSignup } from '../actions';
import * as ROUTES from '../constants/routes';
import signinButton from '../assets/google_signin_white.png';
import '../styles/SignUp.scss';


// This regex describe the format of a valid email.
const regExp = RegExp(
  /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
);

/*
* formValid function checks whether all of user inputs are valid or not.
* This is invoked when users click on `submit` button.
*/
const formValid = ({ isError, ...rest }) => {
  let isValid = true;

  Object.values(isError).every(val => {
    if (val.length > 0) {
      isValid = false
      return false;
    }
    return true;
  });

  Object.values(rest).every(val => {
    if (val === null) {
      isValid = false
      return false
    }
    return true;
  });

  return isValid;
};

class SignupBase extends Component {

  constructor(props) {
    super(props)

    this.state = {
      signUpType: null,
      userType: null,
      isError: {    // This isError object will hold the form errors for every state.
        email: '',
        password1: '',
        password2: '',
        name: '',
        address: '',
        account: ''
      },
      email: null,
      password1: null,
      password2: null,
      name: null,
      address: null,
      account: 'private'
    }
  }

  onSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      const { name, address, email, password1, password2, account } = this.state;
      this.props.signup(name, address, email, password1, password2, account);
      console.log(this.state)  // Interact with backend in future
    } else {
      console.log("Form is invalid!");
    }
  }

  /*
  * formValChange checks whether the form state matches the specific condition and returning the error messages.
  * When the state doesn’t match up with a specific condition. This way we are showing the error messages in React component.
  */
  formValChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };

    switch (name) {
      case "email":
        isError.email = regExp.test(value)
          ? ""
          : "Email address is invalid";
        break;
      case "name":
        isError.name = value.length < 1  ? "Name cannot be blank" : "";
        break;
      case "address":
        isError.address = value.length < 1 ? "Address cannot be blank": "";
      case "password1":
        isError.password1 =
          value.length < 8 ? "At least 8 characaters required" : "";
        break;
      case "password2":
        isError.password2 =
          value !== this.state.password1 ? "Mismatch password" : "";
        break;
      default:
        break;
    }

    this.setState({
      isError,
      [name]: value,
    })
  };

  renderUserOptions() {
    return (
      <div className='tile-container'>
        <div className='tile is-6 is-vertical is-parent'>

            <h3 className='title section-title'>Select Account Type</h3>

              <div className="tile is-child box signup-option">
                <article className="media">
                  <div className="media-left">
                    <span className="icon">
                      <i className="fas fa-user fa-2x"></i>
                    </span>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <h4>Private Account</h4>
                      <p>
                        Account for personal use and registration of personal vessels such as yacht's.
                      </p>
                    </div>
                  </div>
                </article>
              </div>


              <div className="tile is-child box signup-option">
                <article className="media">
                  <div className="media-left">
                    <span className="icon">
                      <i className="fas fa-user-tie fa-2x"></i>
                    </span>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <h4>Broker Account</h4>
                      <p>
                        Accounts for Brokers with advanced features to help you stay on top of vessel documentation
                        tracking.
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div className="tile is-child box signup-option">
                <article className="media">
                  <div className="media-left">
                    <span className="icon">
                      <i className="fas fa-users fa-2x"></i>
                    </span>
                  </div>
                  <div className="media-content">
                    <div className="content">
                      <h4>Corporate Account</h4>
                      <p>
                        Account to track all business vessel's and ships. ability to have everyone in the team
                        manage vessel's documentation.
                      </p>
                    </div>
                  </div>
                </article>
              </div>

        </div>
      </div>
    );
  }

  render() {
    const { isError } = this.state;
    const { error, loading, token } = this.props;
    const containerClasses = loading ? 'container loading' : 'container';

    if (token) {
      return <Redirect to={ROUTES.LANDING} />;
    }

    if (!this.state.userType) {
      return this.renderUserOptions();
    }

    if (!this.state.signUpType) {
      return (
        <div className='hero is-fullheight'>
          <div className='hero-body'>
            <div className='container'>
              <div className='columns is-centered'>
                <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
                  <div className="field">
                    <div className="control">
                      <button className="button is-medium is-fullwidth" onClick={() => {this.setState({signUpType: 'google'})}}>
                        <span className="icon">
                          <i className='fab fa-google'></i>
                        </span>
                        <span>Sign up with google</span>
                      </button>
                    </div>
                  </div>
                  <div className='is-fullwidth has-text-centered'>
                    <span>OR</span>
                  </div>
                  <div className="field">
                    <div className="control">
                      <button className="button is-medium is-fullwidth" onClick={() => {this.setState({signUpType: 'email'})}}>
                        <span className="icon">
                          <i className='fas fa-envelope'></i>
                        </span>
                        <span>Sign up with email</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    document.body.classList.add('has-navbar-fixed-top');

    if (this.state.signUpType === 'google') {
      return (
        <div className='container'>
          Not implemented :)
        </div>
      );
    }

    if (this.state.signUpType === 'email') {
      return (
        <div className='hero is-fullheight'>
          <div className='hero-body'>
            <div className={containerClasses}>
              <h1 className="is-size-2">Create account</h1>
              <div className="field">
                <label className="label">Name</label>
                <div className='control'>
                  <input className='input' placeholder="Name" type="text" name="name" onChange={this.formValChange} />
                </div>
                {isError.name.length > 0 && (
                  <p className='help is-danger'>
                    {isError.name}
                  </p>
                )}
              </div>
              <div className="field">
                <label className="label">Home Address</label>
                <div className='control has-icons-left'>
                  <input className='input' placeholder="Address" type="text" name="address" onChange={this.formValChange} />
                  <span className='icon is-small is-left'>
                    <i className='fas fa-home'></i>
                  </span>
                </div>
                  <p className='help is-danger'>
                    {isError.address}
                  </p>
              </div>
              <div className="field">
                <label className="label">Email address</label>
                <div className='control has-icons-left'>
                  <input className='input' placeholder="Email address" type="text" name="email" onChange={this.formValChange} />
                  <span className='icon is-small is-left'>
                    <i className='fas fa-envelope'></i>
                  </span>
                </div>
                {isError.email.length > 0 && (
                  <p className='help is-danger'>
                    {isError.email}
                  </p>
                )}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className='control has-icons-left'>
                  <input className='input' placeholder="Password" type="password" name="password1" onChange={this.formValChange} />
                  <span className='icon is-small is-left'>
                    <i className='fas fa-lock'></i>
                  </span>
                </div>
                {isError.password1.length > 0 && (
                  <p className='help is-danger'>
                    {isError.password1}
                  </p>
                )}
              </div>
              <div className="field">
                <label className="label">Re-enter password</label>
                <div className='control has-icons-left'>
                  <input className='input' placeholder="Reenter Password" type="password" name="password2" onChange={this.formValChange} />
                  <span className='icon is-small is-left'>
                    <i className='fas fa-lock'></i>
                  </span>
                </div>
                {isError.password2.length > 0 && (
                  <p className='help is-danger'>
                    {isError.password2}
                  </p>
                )}
              </div>
              <div className='field'>
              <label className='label'>Account Type</label>
              <div className="control">
                <div className="select">
                  <select value={this.state.account} onChange={(e) => this.setState({account: e.target.value})}>
                    <option value='private'>Personal Account</option>
                    <option value='broker'>Broker Account</option>
                  </select>
                </div>
                </div>
              </div>
              <br />
              <div className='field'>
                <div className='control'>
                  <button className='button is-primary' onClick={this.onSubmit}>Submit</button>
                </div>
              </div>
              {loading && (
                <span className="loading-icon icon is-large">
                    <i className="fas fa-3x fa-spinner fa-pulse"></i>
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (name, address, email, password1, password2, account) =>
      dispatch(authSignup(name, address, email, password1, password2, account))
  };
}

const Signup = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupBase);

export default Signup;
