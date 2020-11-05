import React , {Component}from 'react';
import ourFlag from '../assets/our_flag.png';

class Login extends Component{
    constructor(props) {
      super(props);

      this.state = {
        username: '',
        password: ''
      };
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { username, password } = this.state;
        this.props.login(username, password);
    }

    render(){
        return (
          <div className="container">
            <div className="content">
              <div align="center">
                <div>
                  <figure className="image">
                    <img className="is-rounded" src={ourFlag} style={{ height: '384px', width: '384px', display: 'inline-block' }} alt="Our Flag"/>
                  </figure>
              </div>
                <h1 className="is-size-2">Log in</h1>
                  <div className="field">
                      <label className="label">Email address</label>
                      <input placeholder="Email address"type="text" name="email"/>
                  </div>
                  <div className="field">
                      <label className="label">Password</label>
                      <input placeholder="Password"type="password"name="password1"/>
                  </div>
                  <br/>
                  <input type="submit"value="Submit"/>
                <br/>
            </div>
            </div>
          </div>
    );
}
}
export {Login};
