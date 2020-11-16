import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { authLogin } from '../actions';
import ourFlag from '../assets/our_flag.png';
import * as ROUTES from '../constants/routes';

class LoginBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    this.props.login(email, password);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { error, loading, token } = this.props;
    const containerClasses = loading ? 'container loading' : 'container';

    if (token) {
      return <Redirect to={ROUTES.LANDING} />
    }

    document.body.classList.add('has-navbar-fixed-top');
    return (
      <div className='hero is-full-height'>
        <div className='hero-body'>
          <div className={containerClasses}>
            <div className='columns is-centered'>
              <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
                <h1 className="is-size-2">Log in</h1>
                <div className="field">
                  <div className="control">
                    <button className="button is-medium is-fullwidth" onClick={() => { this.setState({ signUpType: 'google' }) }}>
                      <span className="icon">
                        <i className='fab fa-google'></i>
                      </span>
                      <span>Login with google</span>
                    </button>
                  </div>
                </div>
                <div className='is-fullwidth has-text-centered'>
                  <span>OR</span>
                </div>
                <div className="field">
                  <label className="label">Email Address</label>
                  <input className='input' placeholder="Email address" type="email" name="email" onChange={this.handleChange} />
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <input className='input' placeholder="Password" type="password" name="password" onChange={this.handleChange} />
                </div>
                <br />
                <div className='field'>
                  <div className='control'>
                    <button className='button is-primary' onClick={this.onSubmit}>Submit</button>
                                    &nbsp;&nbsp;&nbsp;
                    <Link className="link password-reset" to={ROUTES.PASSWORD_RESET}>
                      <button className='button password-reset'>Forgot password?</button>
                    </Link>
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
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(authLogin(email, password))
  };
};

const Login = connect(
  mapStatetoProps,
  mapDispatchToProps
)(LoginBase);

export default Login;