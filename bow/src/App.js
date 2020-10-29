import React, { Component } from 'react';
// import signinButton from 'assets/google_signin_white.png';

import './css/App.css';

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
                    Connecting UCSC students & faculty to improve involvement in research.
                  </h1>
                  <a href="/auth/google" className="has-text-centered">
                    {/* <button
                      style={{
                        background: `url("${signinButton}")`, backgroundSize: 'cover', width: 196, height: 46, border: 'none', display: 'inline-block'
                      }}
                      className="button"
                      onClick={this.signIn}
                      title="Sign In"
                    /> */}
                  </a>
                  <br /><br />
                  <div className="subtitle is-size-7 is-uppercase has-text-centered">
                    Scroll down to see how ResearchConnect can help you!
                  </div>
                </div>
                <div className="column is-half">
                  <figure className="image has-text-centered">
                    <img className="is-rounded" src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1141&q=80" style={{ height: '384px', width: '384px', display: 'inline-block' }} />
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
                    Sign in with your
                    <strong>@ucsc.edu</strong>
                    {' '}
  email with Google.
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
                  <p>Apply for open positions based on your interests and skills.</p>
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
                  <p>If you get selected, interview with the professor.</p>
                </div>
              </li>
              <li className="step-item is-success is-active">
                <div className="step-marker">
                  <span className="icon">
                    <i className="fa fa-flag" />
                  </span>
                </div>
                <div className="step-details">
                  <p className="step-title">Step 4</p>
                  <p>Congrats! Now go help make the world a better place!</p>
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
                <h1 className="title is-uppercase">Professors</h1>
              </div>
              <div className="column">
                <div className="content is-large">
                  <ol style={{ wordBreak: 'break-word' }}>
                    <li>Get rid of your inbox clutter of students asking what research positions you have</li>
                    <li>See all the data about all your applicants in one view, making it easier than ever to pick the best of the best</li>
                    <li>Easily gain access to students from different majors to suit your needs</li>
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
                <h1 className="title is-uppercase">Students</h1>
              </div>
              <div className="column">
                <div className="content is-large">
                  <ol style={{ wordBreak: 'break-word' }}>
                    <li>Find which professors are looking for undergraduate students in one view. No more sending hundreds of cold emails</li>
                    <li>Easily filter out the research that you are not applicable for or have no interest in</li>
                    <li>Contact your favorite professors about their projects in a simple application</li>
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
                <h1 className="title is-uppercase">Grad Students</h1>
              </div>
              <div className="column">
                <div className="content is-large">
                  <ol style={{ wordBreak: 'break-word' }}>
                    <li>Have a project that you need help with? Easily find hundred of students looking for experience</li>
                    <li>Select the best students for your job, no more searching around or asking for referrals</li>
                    <li>ResearchConnect is not limited to just research! If you want to host a seminar or form a group, ResearchConnect is a great place!</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default App;
