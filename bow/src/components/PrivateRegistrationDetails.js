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
            <div>
                <Link to={ROUTES.PRIVATE_REGISTRATION}></Link>
            </div>
        );
    }
}

export default withRouter(PrivateRegistrationDetails);