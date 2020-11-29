import React, { Component } from 'react';
import brandingImg from '../assets/our_flag.png';
import '../styles/Organization.scss';
import * as ROUTES from '../constants/routes';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';


class VesselNameLookup extends Component {
  constructor(props) {
    super(props);
    const vesselName = localStorage.getItem("vesselName")
    this.state = {
      ports: [],
      selectedPort: "",
      name_available: false,
      application_sent: false,
      reserveName: false,
      vesselName: vesselName !== null ? vesselName : "",
      loading: false,
      displayRespMessage: '',
    }
    this.promptToReserve = this.promptToReserve.bind(this)
    this.submitApplication = this.submitApplication.bind(this)
    this.reserveName = this.reserveName.bind(this)
    this.availablePorts = this.availablePorts.bind(this)
  }

  checkNameAvailability = (e) => {
    const { vesselName } = this.state;
    this.setState({ application_sent: false })

    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/vessel_lookup/`, {
        "vesselName": vesselName,
      })
      .then(res => {
        this.setState({
          availability: res.data.message,
          name_available: res.data.available,
          ports: res.data.ports
        })
      })
      .catch(err => {
        console.log(err)
      });
  }


  submitApplication() {
    // TODO SEND POST REQUEST TO RESERVE NAME - ZT - 11/17/2020
    // NEED TO CREATE DB FIRST TO DETERMINE HOW TO HANDLE RESERVED NAMES
    const vesselName = this.state.vesselName;
    const selectedPort = this.state.selectedPort;
    const email = this.props.auth.user.email;
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/reserve-name/`, {
        "name": vesselName,
        "port": selectedPort,
        "email": email
      })
      .then(res => {
        this.setState({ application_sent: true });
        // set new reserved name
        localStorage.removeItem("selectedPort");
        localStorage.setItem("selectedPort", selectedPort);
        console.log("Name reserved.")
        this.setState({ loading: false })
        this.setState({ displayRespMessage: res.data.detail })
        return null;
      })
      .catch(err => {
        console.log(err)
        this.setState({ loading: false })
        this.setState({ displayRespMessage: "The submitted port does not exist." })
        this.setState({ displayRespMessage: JSON.stringify(err) })
      });

  }

  reserveName() {
    this.setState({ reserveName: true });
  }

  availablePorts() {
    return <div className='field'>
      <label className='label'>Desired Home Port</label>
      <div class="control">
        <div class="select">
          <select value={this.state.selectedPort} onChange={(e) => this.setState({ selectedPort: e.target.value })}>
            {this.state.ports.map((value) => {
              return <option key={value} value={value}>{value}</option>
            })}
          </select>
        </div>
      </div>
    </div>
  }

  promptToReserve() {
    if (!this.props.auth.token) {
      const pathname = ROUTES.LOGIN
      const thisPage = ROUTES.VESSEL_NAME_LOOKUP
      const pathname_2 = ROUTES.SIGN_UP

      return (
        < div>
        <br />
          You need to be logged in to reserve a vessel name. < Link to={{ pathname: pathname, prevPage: thisPage }}> Login</Link > or < Link to={{ pathname: pathname_2, prevPage: thisPage }}> Sign Up? </Link > 
        </div >
      );
    } else {
      return (
        <div className='field'>
          <div className='control'>
            <br />
            <h1>Would you like to submit an application to reserve this name under your account?</h1>
            <br />
            <button className='button is-primary' onClick={this.reserveName}>Reserve Name</button>
          </div>
          <div>
            <br />
            {this.state.reserveName ? <this.availablePorts /> : null}
          </div>
          <div>
            <br />
            {this.state.reserveName ? <button className='button is-primary' onClick={this.submitApplication}>Submit Application</button> : null}
            <br />
            <br />
            {this.state.application_sent ? <h1>An application has been successfully submitted!</h1> : null}
          </div>
        </div>)
        ;
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "vesselName") {
      localStorage.setItem(e.target.name, e.target.value)
    }
  }

  render() {
    const { displayRespMessage, loading } = this.state

    return (
      <section className='hero is-large'>
        <div className='container'>
          <div className='columns is-vcentered'>
            <div className='column is-5 has-text-centered'>
              <img src={brandingImg} alt="Logo" />
            </div>
            <div className='column is-6'>
              <h1 className='title'>Check for Vessel name availability</h1>
              <div className="field">
                <label className="label">Vessel Name</label>
                <input id="vessel-name-input" className='input' value={this.state.vesselName} placeholder="Vessel name" type="text" name="vesselName" onChange={this.handleChange} />
              </div>
              <div className='field'>
                <div className='control'>
                  <button id="check-btn" className='button is-primary' onClick={this.checkNameAvailability}>Check Availability</button>
                </div>
              </div>
              <div name="resultOfCheck">
                <h1 id="check-result">{this.state.availability}</h1>
              </div>
              <div>
                {this.state.name_available ? <this.promptToReserve /> : null}
              </div>
              {loading && (
                <span className="loading-icon icon is-large">
                  <i className="fas fa-3x fa-spinner fa-pulse"></i>
                </span>
              )}
              <div id="display-resp-message-selector" className="field is-below">
                {displayRespMessage}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

const VesselNameLookupConnect = connect(
  mapStateToProps
)(VesselNameLookup);

export default withRouter(VesselNameLookupConnect);