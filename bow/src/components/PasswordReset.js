import React, { Component } from 'react';
import { connect } from 'react-redux';
import { passwordReset } from '../actions';
import * as ROUTES from '../constants/routes';
import { Redirect, Link } from 'react-router-dom';

class PasswordResetBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
        };
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { email } = this.state;
        this.props.passwordReset(email);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { error, message, status } = this.props;

        if (message) {
            // TODO: notify user of email being sent and of redirect
            console.log(message)
            // return < Redirect to={ROUTES.PASSWORD_RESET_CONFIRM} />;
        }

        return (
            <div className='hero is-full-height'>
                <div className='hero-body'>
                    <div className='columns is-centered'>
                        <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
                            <h1 className="is-size-2">Password Reset</h1>
                            <div className="field">
                                <label className="label">Email Address</label>
                                <input className='input' placeholder="Email address" type="email" name="email" onChange={this.handleChange} />
                            </div>
                            <br />
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

const mapStatetoProps = (state) => {
    return {
        email: state.auth.email,
        message: state.auth.message,
        status: state.auth.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        passwordReset: (email) => dispatch(passwordReset(email))
    };
};

const PasswordReset = connect(
    mapStatetoProps,
    mapDispatchToProps
)(PasswordResetBase);

export default PasswordReset;