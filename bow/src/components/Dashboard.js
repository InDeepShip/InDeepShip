import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrivateDashboard from './PrivateDashboard';
import RegistrarDashboard from './RegistrarDashboard';
import Spinner from './Spinner';
import * as actions from '../actions';
import * as ROUTES from '../constants/routes';
import { Redirect } from 'react-router-dom';

class DashboardBase extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        if (this.props.auth) {
            const { user } = this.props.auth;

            if (!user) {
                return <Redirect to={ROUTES.LANDING} />
            }

            if (user.account === 'private') {
                return <PrivateDashboard />
            }

            if (user.account === 'registrar') {
                return <RegistrarDashboard />;
            }

            if (user.account === 'broker') {
                return (
                    <div></div>
                )
            }
        } else {
            return (
                <Spinner fullPage />
            );
        }
    }
}

const mapStatetoProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

const Dashboard = connect(
    mapStatetoProps,
    mapDispatchToProps
)(DashboardBase);

export default Dashboard;