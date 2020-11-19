import React, { Component } from 'react';
import { connect } from 'react-redux';
import { passwordReset } from '../actions';
import * as ROUTES from '../constants/routes';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class PasswordReset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            displayMessage: '',
            loading: false
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { email } = this.state;
        this.setState({ loading: true })

        axios
            .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/users/password/reset/`, {
                email: email
            })
            .then(res => {
                console.log(res.data)
                this.setState({ loading: false })
                this.setState({ displayMessage: res.data.detail })
            })
            .catch(err => {
                console.log(err)
                this.setState({ loading: false })
                this.setState({ displayMessage: JSON.stringify(err.response.data) })
            });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { displayMessage, loading } = this.state

        return (
            <div id="pwd-reset-page-selector" className='hero is-full-height'>
                <div className='hero-body'>
                    <div className='columns is-centered'>
                        <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
                            <h1 className="is-size-2">Password Reset</h1>
                            <div className="field">
                                <label className="label">Email Address</label>
                                <input id="email-selector" className='input' placeholder="Email address" type="email" name="email" onChange={this.handleChange} />
                            </div>
                            <br />
                            <div className='field'>
                                <div className='control'>
                                    <button id="submit-selector" className='button is-primary' onClick={this.onSubmit}>Submit</button>
                                </div>
                            </div>
                            {loading && (
                                <span className="loading-icon icon is-large">
                                    <i className="fas fa-3x fa-spinner fa-pulse"></i>
                                </span>
                            )}
                            <div className="field is-below">
                                {displayMessage}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PasswordReset;