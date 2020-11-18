import React, { Component } from 'react';
import brandingImg from '../assets/our_flag.png';
import '../styles/Organization.scss';
import { Field, reduxForm } from 'redux-form';
import * as ROUTES from '../constants/routes';
import { Link, withRouter } from 'react-router-dom';
import { Alert } from 'reactstrap';
import axios from 'axios';



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
      application_sent: false
    }
    this.PromptToReserve = this.PromptToReserve.bind(this)
    this.reserveName = this.reserveName.bind(this)

    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/ports/`)
      .then(res => {
        this.setState({
          "ports": res.data.ports
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  checkNameAvailability = (e) => {
    const { vesselName, portName } = this.state;
    const vessel = this.state["vesselName"];
    const port = this.state["selectedPort"];
    this.setState({ application_sent: false })

    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/vessel_lookup/`, {
        "vesselName": vessel,
        "portName": port
      })
      .then(res => {
        this.setState({
          availability: res.data.message, name_available: res.data.available
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  reserveName() {
    // TODO SEND POST REQUEST TO RESERVE NAME - ZT - 11/17/2020
    // NEED TO CREATE DB FIRST TO DETERMINE HOW TO HANDLE RESERVED NAMES
    this.setState({ application_sent: true })
    return null;
  }

  PromptToReserve() {
    if (this.props.auth) {
      return (
        <div>
          <br />
          <h1>You can <Link to={ROUTES.LOGIN}>login</Link> or <Link to={ROUTES.SIGN_UP}>sign up</Link> to reserve this vessel name.</h1>
        </div>
      );
    }

    return <div className='field'>
      <div className='control'>
        <br />
        <h1>Would you like to submit an application to reserve this name under your account?</h1>
        <br />
        <button className='button is-primary' onClick={this.reserveName}>Reserve Name</button>
      </div>
      <div>
        <br />
        {this.state.application_sent ? <h1>An application has been successfully submitted!</h1> : null}
      </div>
    </div>
      ;
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
              <h1 className='title'>
                Check for Vessel name availability
                                </h1>
              <div className="field">
                <label className="label">Vessel Name</label>
                <input className='input' placeholder="Vessel name" type="text" name="vesselName" onChange={this.handleChange} />
              </div>
              <div className='field'>
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
              <br />
              <div className='field'>
                <div className='control'>
                  <button className='button is-primary' onClick={this.checkNameAvailability}>Check availability</button>
                </div>
              </div>
              <div name="resultOfCheck">
                <h1>{this.state.availability}</h1>
              </div>
              <div>
                {this.state.name_available ? <this.PromptToReserve /> : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default VesselNameLookup;
