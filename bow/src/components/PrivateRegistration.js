import React, { Component } from 'react';
import { connect } from 'react-redux';
import { privateRegistration } from '../actions';

class PrivateRegistrationBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            vessel: '',
            email: '',
            phone: null,
            address: '',
            port: '',
            imo: null,
            tonnage: '',
            propulsion: '',
            builder_name: '',
            builder_address: '',
            yard_number: '',
            date: '',
            vessel_length: '',
            hulls: null,
            purpose: ''

        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();

    }

    render() {
        return (
            <div className='container'>
            <div className='columns is-centered'>
            <div className='column'>
            <div className="form">
                <div className="field">
                    <label className="label">Owner Name</label>
                    <div className="control">
                        <input className="input" name='name' type="text" placeholder="Name" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Vessel Name</label>
                    <div className="control">
                        <input className="input" name='vessel' type="text" placeholder="Vessel Name" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Contact Email Address</label>
                    <div className='control has-icons-left'>
                        <input className='input' placeholder="Email address" type="text" name="email" onChange={this.handleChange} />
                        <span className='icon is-small is-left'>
                            <i className='fas fa-envelope'></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Phone number</label>
                    <div className='control has-icons-left'>
                        <input className='input' placeholder="1-888-888-8888" type="tel" name="phone" onChange={this.handleChange} />
                        <span className='icon is-small is-left'>
                            <i className='fas fa-phone'></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Home Address</label>
                    <div className='control has-icons-left'>
                        <input className='input' placeholder="Address" type="text" name="address" onChange={this.handleChange} />
                        <span className='icon is-small is-left'>
                            <i className='fas fa-home'></i>
                        </span>
                    </div>
                    <p className='help is-danger'>
                    </p>
                </div>
                <div class="field">
                    <label class="label">Port</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                        <select name='port' onChange={this.handleChange}>
                            <option>Port 1</option>
                            <option>Port 2</option>
                            <option>Port 3</option>
                        </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">IMO (International Maritime Organization) Number</label>
                    <div className='control has-icons-left'>
                        <input className='input' placeholder="" type="text" name="imo" onChange={this.handleChange} />
                        <span className='icon is-small is-left'>
                            <i className='fas fa-hashtag'></i>
                        </span>
                    </div>
                </div>
                 <div className="field">
                    <label className="label">Gross Tonnage</label>
                    <div className='control has-icons-left'>
                        <input className='input' placeholder="" type="text" name="tonnage" onChange={this.handleChange} />
                        <span className='icon is-small is-left'>
                            <i className='fas fa-weight-hanging'></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Method of Propulsion</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                        <select name='propulsion' onChange={this.handleChange}>
                            <option>Method 1</option>
                            <option>Method 2</option>
                            <option>Method 3</option>
                        </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Builder Name</label>
                    <div className="control">
                        <input className="input" name='builder_name' type="text" placeholder="Builder Name" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Builder Address</label>
                    <div className='control has-icons-left'>
                        <input className='input' placeholder="Builder Address" type="text" name="builder_address" onChange={this.handleChange} />
                        <span className='icon is-small is-left'>
                            <i className='fas fa-home'></i>
                        </span>
                    </div>
                    <p className='help is-danger'>
                    </p>
                </div>
                <div className="field">
                    <label className="label">Yard Number</label>
                    <div className="control">
                        <input className="input" name='yard_number' type="text" placeholder="Yard Number" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Proposed Registration Date</label>
                    <div className="control">
                        <input className="input" name='date' type="text" placeholder="Date" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Length of Ship</label>
                    <div className="control">
                        <input className="input" name='vessel_length' type="text" placeholder="Length" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Number of Hulls</label>
                    <div className="control has-icons-left">
                        <input className="input" name='hulls' type="text" placeholder="Hulls" onChange={this.handleChange}/>
                        <span className='icon is-small is-left'>
                            <i className='fas fa-hashtag'></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Purpose of Boat</label>
                    <div className="control">
                        <textarea className="textarea" name='purpose' type="text" placeholder="Description of Purpose" onChnage={this.handleChange}/>
                    </div>
                </div>
                <div className='field'>
                    <div className='control'>
                        <button className='button is-primary' onClick={this.onSubmit}>Submit</button>
                    </div>
                </div>
            </div>
            </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.registration.loading,
        error: state.registration.error,
        message: state.registration.message
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (registrationForm) => dispatch(privateRegistration(registrationForm))
    };
}

const PrivateRegistration = connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRegistrationBase);

export default PrivateRegistration;