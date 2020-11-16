import React, { Component } from 'react';
import { connect } from 'react-redux';
import { passwordReset } from '../actions';


class PasswordResetConfirmBase extends Component {
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

        return (
            <div className='hero is-full-height'>
                <div className='hero-body'>
                    <div className='columns is-centered'>
                        <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
                            <h1 className="is-size-3">Password Reset Confirm</h1>
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

const PasswordResetConfirm = connect(
    mapStatetoProps,
    mapDispatchToProps
)(PasswordResetConfirmBase);

export default PasswordResetConfirm;