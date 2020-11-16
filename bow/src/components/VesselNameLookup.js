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

        this.state = {"portName" : "Whitby Harbour"};
    }

    onSubmit = (e) => {
      const { vesselName, portName } = this.state;
      const vessel = this.state["vesselName"];
      const port = this.state["portName"];
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
      .then( data => {
          this.setState({
              availability: data["message"]
            }
          );
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
                          <select value={this.state.portName} onChange={(e) => this.setState({portName: e.target.value})}>
                            <option value='Whitby Harbour'>Whitby Harbour</option>
                            <option value='Scarborough'>Scarborough</option>
                            <option value='Point Newcastle'>Point Newcastle</option>
                            <option value='Barrow'>Barrow</option>
                            <option value='Robin Hood&#39;s Bay'>Robin Hood's Bay</option>
                            <option value='Victoria'>Victoria</option>
                          </select>
                        </div>
                    </div>
                  </div>
                    <br />
                    <div className='field'>
                      <div className='control'>
                        <button className='button is-primary' onClick={this.onSubmit}>Check availability</button>
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
