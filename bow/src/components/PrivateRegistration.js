import React, { Component } from 'react';
import { connect } from 'react-redux';
import { privateRegistration } from '../actions';

class PrivateRegistrationBase extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="form">
                <div className="field">
                    <label className="label">Owner Name</label>
                    <div className="control">
                        <input className="input" name='ownerName' type="text" placeholder="Name" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Vessel Name</label>
                    <div className="control">
                        <input className="input" name='vesselName' type="text" placeholder="Vessel Name" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Contact Email Address</label>
                    <div className='control has-icons-left'>
                        <input className='input' placeholder="Email address" type="text" name="email" onChange={this.formValChange} />
                        <span className='icon is-small is-left'>
                            <i className='fas fa-envelope'></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Phone number</label>
                    <div className='control has-icons-left'>
                        <input className='input' placeholder="1-888-888-8888" type="tel" name="phone" onChange={this.formValChange} />
                        <span className='icon is-small is-left'>
                            <i className='fas fa-phone'></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Home Address</label>
                    <div className='control has-icons-left'>
                        <input className='input' placeholder="Address" type="text" name="address" onChange={this.formValChange} />
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
                        <select>
                            <option>Port 1</option>
                            <option>Port 2</option>
                            <option>Port 3</option>
                        </select>
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