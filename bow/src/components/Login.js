import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authLogin } from '../actions';
import ourFlag from '../assets/our_flag.png';
import * as ROUTES from '../constants/routes';

class LoginBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: ''
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, email, password } = this.state;
    this.props.login(username, email, password);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { error, loading, token } = this.props;

    if (token) {
      return <Redirect to={ROUTES.LANDING} />
    }

    document.body.classList.add('has-navbar-fixed-top');
    return (
      <div className="container">
        <div className="content">
          <div align="center">
            <div>
              <figure className="image">
                <img className="is-rounded" src={ourFlag} style={{ height: '384px', width: '384px', display: 'inline-block' }} alt="Our Flag" />
              </figure>
            </div>
            <h1 className="is-size-2">Log in</h1>
            <div className="field">
              <label className="label">Username</label>
              <input placeholder="Username" type="text" name="username" onChange={this.handleChange} />
            </div>
            <div className="field">
              <label className="label">Email address</label>
              <input placeholder="Email address" type="email" name="email" onChange={this.handleChange} />
            </div>
            <div className="field">
              <label className="label">Password</label>
              <input placeholder="Password" type="password" name="password" onChange={this.handleChange} />
            </div>
            <br />
            <input type="submit" value="Submit" onClick={this.onSubmit} />
            <br />
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
    login: (username, email, password) => dispatch(authLogin(username, email, password))
  };
};

const Login = connect(
  mapStatetoProps,
  mapDispatchToProps
)(LoginBase);

export default Login;