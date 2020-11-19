import React, { Component } from 'react';
import { connect } from 'react-redux';
import { passwordReset } from '../actions';
import * as QueryString from "query-string";
import axios from 'axios';


class PasswordResetConfirm extends Component {
    constructor(props) {
        super(props);

        this.params = QueryString.parse(props.location.search);
        this.state = {
            new_password1: '',
            new_password2: '',
            uid: this.params.uid,
            token: this.params.token,
            displayMessage: ''
        };
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { new_password1, new_password2, uid, token } = this.state;

        axios
            .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/users/password/reset/confirm/`, {
                "new_password1": new_password1,
                "new_password2": new_password2,
                "uid": uid,
                "token": token
            })
            .then(res => {
                console.log(res.data)
                this.setState({ displayMessage: res.data.detail })
            })
            .catch(err => {
                console.log(err)
                this.setState({ displayMessage: JSON.stringify(err.response.data) })
            });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { displayMessage } = this.state
        return (
            <div className='hero is-full-height'>
                <div className='hero-body'>
                    <div className='columns is-centered'>
                        <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
                            <h1 className="is-size-3">Password Reset Confirm</h1>
                            <div className="field">
                                <label className="label">New Password</label>
                                <input id="new-password-1-selector" className='input' placeholder="Password" type="password" name="new_password1" onChange={this.handleChange} />
                            </div>
                            <div className="field">
                                <label className="label">Re-Enter New Password</label>
                                <input id="new-password-2-selector" className='input' placeholder="Password" type="password" name="new_password2" onChange={this.handleChange} />
                            </div>
                            <br />
                            <div className='field'>
                                <div className='control'>
                                    <button className='button is-primary' onClick={this.onSubmit}>Submit</button>
                                </div>
                            </div>
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

export default PasswordResetConfirm;