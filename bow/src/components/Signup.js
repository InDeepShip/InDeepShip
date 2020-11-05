import React , {Component}from 'react';
import ourFlag from '../assets/our_flag.png';
import { Redirect } from 'react-router-dom';


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

class Signup extends Component{

    constructor(props) {
      super(props)

      this.state = {
        isError: {    // This isError object will hold the form errors for every state.
          email: '',
          password1: '',
          password2: ''
      },
          email: null,
          password1: null,
          password2: null,          
      }
    }
    onSubmit = e => {
      e.preventDefault();
      if (formValid(this.state)) {
          fetch("http://206.189.218.111/api/users/signup",{
            method: 'POST',
              body: JSON.stringify({
                  "email": this.state.email,
                  "password1": this.state.password1
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then(response => {
              if (response.status === 200){
                  return <Redirect to='/login' />

              }else {
                  console.log("Your account creation didn't work");
              }
          })
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
export {Signup};
