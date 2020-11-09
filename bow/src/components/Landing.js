import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import signinButton from '../assets/google_signin_white.png';
import ourFlag from '../assets/our_flag.png';
import ServiceCards from './ServiceCards';
import '../styles/Landing.scss';
import * as ROUTES from '../constants/routes';

class App extends Component {
  render() {
    return (
      <Fragment>
        <section className="hero is-large landing-header">
          <div className='overlay'></div>
          <div className="hero-body is-medium">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-half">
                  <h1 className="title is-size-1 is-size-3-mobile landing-header-text">
                    Connecting boat owners with easy registration processes and helpful brokers since 1815.
                  </h1>
                </div>
                <div className="column is-half is-hidden-mobile">
                    <Link to={ROUTES.LOGIN}>
                      <button className="button is-large">
                      <span className="icon is-medium">
                        <i className="fas fa-user-plus"></i>
                      </span>
                      <span>Get Started</span>
                      </button>
                    </Link>
                </div>
              </div>
              <div className="subtitle is-size-7 is-uppercase has-text-centered landing-header-text">
                Scroll down to see how the Navis Album Department of Shipping Registry can help you!
                  </div>
            </div>
          </div>
        </section>
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
        {<ServiceCards />}
      </Fragment>
    );
  }
}
export default withRouter(App);
