import React , {Component}from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ourFlag from '../assets/our_flag.png';
import { authSignup } from '../actions';
import * as ROUTES from '../constants/routes';


const invalidMsgStyle = {
  color: 'red',
  fontSize: '15px',
};

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

class SignupBase extends Component{

    constructor(props) {
      super(props)

      this.state = {
        isError: {    // This isError object will hold the form errors for every state.
          email: '',
          password1: '',
          password2: '',
          username: ''
      },
          email: null,
          password1: null,
          password2: null,
          username: null
      }
    }
    onSubmit = e => {
      e.preventDefault();
      if (formValid(this.state)) {
        const { username, email, password1, password2 } = this.state;
        this.props.signup(username, email, password1, password2);
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
          case "username":
            isError.username = value.length > 24 ? "Username must be less than 24 characters" : "";
            break;
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

    render(){
        const { isError } = this.state;
        const { error, loading, token } = this.props;

        if (token) {
          return <Redirect to={ROUTES.LANDING} />;
        }

        return (
          //<p className="is-danger">hello trump</p>
          <div className="container">
            <div className="content">
              <div align="center">
                <div>
                  <figure className="image">
                    <img className="is-rounded" src={ourFlag} style={{ height: '384px', width: '384px', display: 'inline-block' }} alt="Our Flag"/>
                  </figure>
              </div>
                <h1 className="is-size-2">Create account</h1>
                  <div className="field">
                      <label className="label">Username</label>
                      <input placeholder="Username" type="text" name="username" onChange={this.formValChange}/>
                      {isError.username.length > 0 && (
                        <div style={invalidMsgStyle}>
                        {isError.username}
                      </div>
                      )}
                  </div>
                  <div className="field">
                      <label className="label">Email address</label>
                      <input placeholder="Email address" type="text" name="email" onChange={this.formValChange}/>
                      {isError.email.length > 0 && (
                        <div style={invalidMsgStyle}>
                        {isError.email}
                      </div>
                      )}
                  </div>
                  <div className="field">
                      <label className="label">Password</label>
                      <input placeholder="Password" type="password" name="password1" onChange={this.formValChange}/>
                      {isError.password1.length > 0 && (
                        <div style={invalidMsgStyle}>
                          {isError.password1}
                        </div>
                      )}
                  </div>
                  <div className="field">
                      <label className="label">Re-enter password</label>
                      <input placeholder="Reenter Password" type="password" name="password2" onChange={this.formValChange}/>
                      {isError.password2.length > 0 && (
                        <div style={invalidMsgStyle}>
                        {isError.password2}
                      </div>
                      )}
                  </div>
                  <br/>
                  <input type="submit" value="Submit" onClick={this.onSubmit}/>
                <br/>
            </div>
            </div>
          </div>
    );
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
        signup: (username, email, password1, password2) =>
            dispatch(authSignup(username, email, password1, password2))
    };
}

const Signup =  connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignupBase);

export default Signup;