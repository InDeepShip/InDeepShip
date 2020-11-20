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
                            <h3 className='title section-title'>Details</h3>
                            <ul className='sidebar-services-list'>
                                <div className='service is-small'>Information</div>
                                <div className='service is-small'>Create Account</div>
                                <div className='service is-small'>File Online Application</div>
                            </ul>
                        </div>
                    </div>
                    <div className='column'>
                        Can add details here
                        <Link to={ROUTES.PRIVATE_REGISTRATION}>
                            <button className='button is-normal is-primary'>Registration Form</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PrivateRegistrationDetails);