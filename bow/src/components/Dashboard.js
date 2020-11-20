import React, { Component } from 'react';
import PrivateDashboard from './PrivateDashboard';
import { connect } from 'react-redux';

class DashboardBase extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { user } = this.props.auth;
        if (user.account === 'private') {
            return <PrivateDashboard />
        }

        if (user.account === 'registrar') {
            return <div />;
        }

        if (user.account === 'broker') {
            return (
                <div></div>
            )
        }
    }
}

const mapStatetoProps = (state) => {
    return {
        auth: state.auth
    }
};

const Dashboard = connect(
    mapStatetoProps
)(DashboardBase);

export default Dashboard;