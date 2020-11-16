import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { authLogin } from '../actions';
import ourFlag from '../assets/our_flag.png';
import * as ROUTES from '../constants/routes';

class PasswordReset extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
        };
    }

    render() {
        return (
            <section className='hero is-large'>
                <div className='hero-body'>
                    <div className='container'>
                        <div className='columns is-vcentered'>
                            <div className='column is-6'>
                                <h1 className='title'>
                                    Password Reset Title
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default PasswordReset;