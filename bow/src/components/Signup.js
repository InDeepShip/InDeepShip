import React , {Component}from 'react';
import ourFlag from '../assets/our_flag.png';

class Signup extends Component{
    render(){
        return (
          <div className="container">
            <div className="content">
                <div className="column is-half">
                  <figure className="image has-text-centered">
                    <img className="is-rounded" src={ourFlag} style={{ height: '384px', width: '384px', display: 'inline-block' }} alt="Our Flag"/>
                  </figure>
              </div>
                <h1 className="is-size-2">Create account</h1>
              <div className="is-vcentered">
                      <input placeholder="Email address"type="text" name="email"/>
                  <br/>
                      <input placeholder="Password"type="password"name="password1"/>
                  <br/>
                  <input placeholder="Reenter Password"type="password"name="password2"/>
                  <br/>
                  <input type="submit"value="submit"/>
                <br />
            </div>
            </div>
          </div>
    );
}
}
export {Signup};
