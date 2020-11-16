import React, { Component } from 'react';
import brandingImg from '../assets/our_flag.png';
import '../styles/Organization.scss';
import { Field, reduxForm } from 'redux-form';

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
      selectedPort: ""
    }
    fetch("http://206.189.218.111/api/ports/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then(data => {
        this.setState({
          "ports": data["ports"]
        })
      })
  }

  checkNameAvailability = (e) => {
    const { vesselName, portName } = this.state;
    const vessel = this.state["vesselName"];
    const port = this.state["selectedPort"];
    fetch("http://206.189.218.111/api/vessel_lookup/",
      {
        method: 'POST',
        body: JSON.stringify({
          "vesselName": vessel,
          "portName": port
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then((response) => response.json())
      .then(data => {
        this.setState({
          availability: data["message"]
        });
      }
      );

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
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default VesselNameLookup;
