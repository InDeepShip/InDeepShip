import React, { Component } from 'react';
import signinButton from '../assets/google_signin_white.png';
import ourFlag from '../assets/our_flag.png';

// import '../css/App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="hero">
          <div className="hero-body is-medium">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-half">
                  <h1 className="title is-size-1 has-text-primary">
                    Connecting boat owners with easy registration processes and helpful brokers since 1815.
                  </h1>
                  <a href="/auth/google" className="has-text-centered">
                    <button
                      style={{
                        background: `url("${signinButton}")`, backgroundSize: 'cover', width: 196, height: 46, border: 'none', display: 'inline-block'
                      }}
                      className="button"
                      // onClick={this.signIn}
                      title="Sign In"
                    />
                  </a>
                  <br /><br />
                  <div className="subtitle is-size-7 is-uppercase has-text-centered">
                    Scroll down to see how the Navis Album Department of Shipping Registry can help you!
                  </div>
                </div>
                <div className="column is-half">
                  <figure className="image has-text-centered">
                    <img className="is-rounded" src={ourFlag} style={{ height: '384px', width: '384px', display: 'inline-block' }} alt="Our Flag"/>
                  </figure>
                </div>
              </div>
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
        <section className="section">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-one-third">
                <h1 className="title is-uppercase">Private owner login</h1>
              </div>
              <div className="column">
                <div className="content is-large">
                  <ol style={{ wordBreak: 'break-word' }}>
                      <ul>Sign in : <a href="./">here</a></ul>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="section">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-one-third">
                <h1 className="title is-uppercase">Broker login</h1>
              </div>
              <div className="column">
                <div className="content is-large">
                  <ol style={{ wordBreak: 'break-word' }}>
                      <ul>Sign in : <a href="./">here</a></ul>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
        <hr />
      </React.Fragment>
    );
  }
}
export default App;