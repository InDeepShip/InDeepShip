import React, { Component } from 'react';
import brandingImg from '../assets/our_flag.png';
import '../styles/Organization.scss';
import * as ROUTES from '../constants/routes';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';




const renderField = ({
  input,
  label,
  placeholder,
  type,
  meta: { touched, error, warning },
}) => (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input {...input} placeholder={placeholder} type={type} className="input" />
        {touched
          && ((error && <p className="help is-danger">{error}</p>)
            || (warning && <p className="help is-warning">{warning}</p>))}
      </div>
    </div>
  );

class VesselNameLookup extends Component {
  constructor(props) {
    super(props);
    const vessel = "Vessel";
    this.state = {
      ports: [],
      selectedPort: "",
      name_available: false,
      application_sent: false,
      reserveName: false
    }
    this.promptToReserve = this.promptToReserve.bind(this)
    this.submitApplication = this.submitApplication.bind(this)
    this.reserveName = this.reserveName.bind(this)
    this.availablePorts = this.availablePorts.bind(this)
  }

  checkNameAvailability = (e) => {
    const { vesselName } = this.state;
    const vessel = this.state["vesselName"];
    this.setState({ application_sent: false })

    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/vessel_lookup/`, {
        "vesselName": vessel,
      })
      .then(res => {
        this.setState({
          availability: res.data.message, name_available: res.data.available, ports: res.data.ports
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  submitApplication() {
    // TODO SEND POST REQUEST TO RESERVE NAME - ZT - 11/17/2020
    // NEED TO CREATE DB FIRST TO DETERMINE HOW TO HANDLE RESERVED NAMES
    this.setState({ application_sent: true });
    return null;
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
    if (!this.props.auth) {
      return (
        <div>
          <br />
          <h1>You can <Link to={ROUTES.LOGIN}>login</Link> or <Link to={ROUTES.SIGN_UP}>sign up</Link> to reserve this vessel name.</h1>
        </div>
      );
    } else{
      return(
         <div className='field'>
          <div className='control'>
            <br />
            <h1>Would you like to submit an application to reserve this name under your account?</h1>
            <br />
            <button className='button is-primary' onClick={this.reserveName}>Reserve Name</button>
          </div>
          <div>
            <br />
            {this.state.reserveName ? <this.availablePorts/>: null}
          </div>
          <div>
            <br />
            {this.state.reserveName ? <button className='button is-primary' onClick={this.submitApplication}>Submit Application</button>: null }
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
  }

  render() {
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
                <input className='input' placeholder="Vessel name" type="text" name="vesselName" onChange={this.handleChange} />
              </div>
              <div className='field'>
                <div className='control'>
                  <button className='button is-primary' onClick={this.checkNameAvailability}>Check Availability</button>
                </div>
              </div>
              <div name="resultOfCheck">
                <h1>{this.state.availability}</h1>
              </div>
              <div>
                {this.state.name_available ? <this.promptToReserve /> : null}
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