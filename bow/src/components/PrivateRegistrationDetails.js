import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

class PrivateRegistrationDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className='container'>
                <div className='columns'>
                    <div className='column is-narrow sidebar'>
                        <div className='boxed sidebar-box'>
                            <h3 className='title section-title'>Registration Process</h3>
                            <ul>
                                <li className='service is-small'>1. Starting</li>
                                <li className='service is-small'>2. Data Gathering</li>
                                <li className='service is-small'>3. Making Account</li>
                                <li className='service is-small'>4. Submission</li>
                            </ul>
                        </div>
                    </div>
                    <div className='column'>
                        <div className='container'>
                            This is where there will be details about the process of registering
                            privately
                            <Link to={ROUTES.PRIVATE_REGISTRATION}>
                                <button className="button is-primary">Private Registration Form</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PrivateRegistrationDetails);