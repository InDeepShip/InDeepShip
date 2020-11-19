import React, { Component } from 'react';
import { connect } from 'react-redux';


class DashboardBase extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div></div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        token: state.auth.token,
        user: state,auth,user
    }
};

const Dashboard = connect(
    mapStatetoProps
)(DashboardBase);

export default Dashboard;
