import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import signinButton from '../assets/google_signin_white.png';
import ourFlag from '../assets/our_flag.png';
import ServiceCards from './ServiceCards';
import '../styles/Landing.scss';
import * as ROUTES from '../constants/routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ports: [],
      loading: true
    }
    fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/ports/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then(data => {
        this.setState({
          "ports": data["ports"],
          loading: false
        })
      })
  }
  render() {
    return (
      <Fragment>
        <section id="landing-page-selector" className="hero is-medium landing-header">
          <div className='overlay'></div>
          <div className="hero-body is-medium">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column is-half">
                  <h1 className="title is-size-1 is-size-3-mobile landing-header-text">
                    Boat Registration Made Easy Since 1815.
                  </h1>
                </div>
                <div className="column is-third is-hidden-mobile get-started-column">
                    <Link className="button is-large" to={ROUTES.LOGIN}>
                      <span className="icon is-medium">
                        <i className="fas fa-user-plus"></i>
                      </span>
                      <span>Get Started</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
       {<ServiceCards />}
        <section className="container">
          <div className="columns is-vcentered is-multiline">
            <div className="column is-half ports-column">
                <div className="button is-large">
                  <span className="icon is-medium">
                    <i className="fas fa-ship"></i>
                  </span>
                  <span>Our Ports</span>
              </div>
            </div>
            <div className="column is-third">
              <aside className="menu is-hidden-mobile">
                  <p className="menu-label">Ports Accepting Registration</p>
                  <ul className="menu-list">
                    {this.state.ports.map((port, index) => {
                      return (
                        <li key={index}>
                            <a href="#" className="">{port}</a>
                        </li>
                      );
                  }
                  )}
                  </ul>
              </aside>
          </div>
          { this.state.loading &&
            <span className="loading-icon icon is-large">
              <i className="fas fa-3x fa-spinner fa-pulse"></i>
            </span>
          }
          </div>
        </section>
      </Fragment>
    );
  }
}
export default withRouter(App);
