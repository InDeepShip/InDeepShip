import React, { Component, Fragment } from 'react';
import signinButton from '../assets/google_signin_white.png';
import ourFlag from '../assets/our_flag.png';
import ServiceCards from './ServiceCards';

class App extends Component {
  render() {
    return (
      <Fragment className='aria-hidden'>
        <section className="hero">
          <div className="hero-body is-medium">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-half">
                  <h1 className="title is-size-1 is-size-3-mobile has-text-primary">
                    Connecting boat owners with easy registration processes and helpful brokers since 1815.
                  </h1>
                </div>
                <div className="column is-half is-hidden-mobile">
                  <figure className="image has-text-centered">
                    <img className="" src={ourFlag} style={{ display: 'inline-block' }} alt="Our Flag" />
                  </figure>
                </div>
              </div>
              <div className="subtitle is-size-7 is-uppercase has-text-centered">
                Scroll down to see how the Navis Album Department of Shipping Registry can help you!
                  </div>
              <a href="/auth/google" className="column is-centered has-text-centered">
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
          </div>
        </section>
        <hr />
        <section className="section">
          <div className="container">
            <div className="title">How it works</div>
            <ul className="steps is-medium">
              <li className="step-item is-black is-active">
                <div className="step-marker">
                  <span className="icon">
                    <i className="fa fa-envelope" />
                  </span>
                </div>
                <div className="step-details">
                  <p className="step-title">Step 1</p>
                  <p>
                    Sign up for an account with your username and email.
                  </p>
                </div>
              </li>
              <li className="step-item is-primary is-completed is-active">
                <div className="step-marker">
                  <span className="icon">
                    <i className="fa fa-check-square" />
                  </span>
                </div>
                <div className="step-details">
                  <p className="step-title">Step 2</p>
                  <p>Create an application for a ship registration.</p>
                </div>
              </li>
              <li className="step-item is-info is-completed is-active">
                <div className="step-marker">
                  <span className="icon">
                    <i className="fa fa-handshake-o" />
                  </span>
                </div>
                <div className="step-details">
                  <p className="step-title">Step 3</p>
                  <p>Get on the ocean!</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
        <hr />
        {<ServiceCards />}
      </Fragment>
    );
  }
}
export default App;
