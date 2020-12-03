import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../styles/RegistrarDashboard.scss';

class RegistrarDashboardBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vessels: [],
            surveyors: [],
            surveyorsCount: 0,
            vesselCount: 0,
            surveyorPayload: {},
            loading: true,
            loadingSubmit: false,
            apiKeys: [],
            displayMessage: "",
        };
    }

    componentDidMount() {

        // Fetch the surveyors api keys then all the vessels
        axios
            .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/surveyors/`)
            .then((res) => {
                var apiKeys = []
                res.data.surveyors.map((item) => (apiKeys.push(item["api_key"])))
                console.log(apiKeys)
                this.setState({ apiKeys: apiKeys })
                return axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/allvessels/`)
            })
            .then((res) => {
                var vessels = res.data.vessels
                var payload = {}
                vessels.map((item) => payload[item.imoNumber] = this.state.apiKeys[0])
                this.setState({
                    vessels: vessels,
                    vesselCount: vessels.length,
                    loading: false,
                    surveyorPayload: payload
                });
            })
            .catch((err) => {
                console.log('Error getting surveyor api keys');
                console.log(err);
            })
    }

    onSubmit = (e) => {
        if (this.state.surveyorPayload) {
            // Make multiple post requests to assign surveyors
            var payloads = []
            Object.keys(this.state.surveyorPayload).map((imo) => (payloads.push({ "imo": imo, "api_key": this.state.surveyorPayload[imo] })))
            console.log(payloads)
            this.setState({ loadingSubmit: true })
            payloads.map((payload) => (
                axios
                    .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/assign-surveyor/`, payload)
                    .then((res) => {
                        console.log("successful update")
                        this.setState({ loadingSubmit: false })
                        this.setState({ displayMessage: res.data.message })
                    })
                    .catch((err) => {
                        console.log("error assigning surveyor");
                        this.setState({ loadingSubmit: false })
                        this.setState({ displayMessage: JSON.stringify(err.response.data) })
                    })
            ))
        }
    }

    handleChange(imoNumber, e) {
        this.state.surveyorPayload[imoNumber] = e.target.value
    }

    renderSurveyors() {
        const { apiKeys } = this.state;

        return (
            apiKeys.map((key, index) => {
                return (
                    <option key={index} value={key}>{key}</option>
                );
            })
        );
    }

    renderApiKeys() {
        const { apiKeys } = this.state;

        return (
            apiKeys.map((key, index) => {
                return (
                    <option key={index} value={key}>{key}</option>
                );
            })
        );
    }

    renderVessels() {
        if (this.state.loading) {
            return (
                <span className="loading-icon icon is-large">
                    <i className="fas fa-2x fa-spinner fa-pulse"></i>
                </span>
            );

        } else {
            const { vessels } = this.state;

            return (
                <table className="table is-fullwidth is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>IMO</th>
                            <th>API Keys</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vessels.map((vessel, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{vessel.name}</td>
                                        <td>{vessel.imoNumber}</td>
                                        <td>
                                            <div className="control">
                                                <div className="select is-fullwidth">
                                                    <select name='api_key' onChange={(e) => this.handleChange(vessel.imoNumber, e)}>
                                                        {this.renderApiKeys()}
                                                    </select>
                                                </div>
                                            </div></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            );
        }
    }

    render() {
        const firstName = this.props.auth ? this.props.auth.user.name.split(' ')[0] : "";
        const { displayMessage, loadingSubmit } = this.state;

        return (
            <div id="private-dashboard-selector" className="container">
                <div className="columns user-columns">
                    <div className="column is-3">
                        <aside className="menu is-hidden-mobile">
                            <p className="menu-label">General</p>
                            <ul className="menu-list">
                                <li>
                                    <a href="#" className="">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#" className="">Customers</a>
                                </li>
                            </ul>
                            <p className="menu-label">Administration</p>
                            <ul className="menu-list">
                                <li>
                                    <a href="#" className="">Item 1</a>
                                </li>
                                <li>
                                    <a href="#" className="">Item 2</a>
                                </li>
                            </ul>
                            <p className="menu-label">Transactions</p>
                            <ul className="menu-list">
                                <li>
                                    <a href="#" className="">Payments</a>
                                </li>
                                <li>
                                    <a href="#" className="">Balance</a>
                                </li>
                                <li>
                                    <a href="#" className="">Reports</a>
                                </li>
                            </ul>
                        </aside>
                    </div>
                    <div className="column is-9">
                        <section className="hero is-primary welcome is-small">
                            <div className="hero-body">
                                <div className="container">
                                    <h1 className="title">
                                        {`Welcome Back, ${firstName}`}
                                    </h1>
                                    <h2 className="sub-title">Hope you are having a great day!</h2>
                                </div>
                            </div>
                        </section>
                        <section className="info-tiles">
                            <div className="tile is-ancestor has-text-centered">
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">{this.state.vesselCount}</p>
                                        <p className="sub-title">Merchant Vessels</p>
                                    </article>
                                </div>
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">0</p>
                                        <p className="sub-title">Applications</p>
                                    </article>
                                </div>
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">0</p>
                                        <p className="sub-title">Payments</p>
                                    </article>
                                </div>
                                <div className="tile is-parent">
                                    <article className="tile is-child box">
                                        <p className="title">0</p>
                                        <p className="sub-title">Notifications</p>
                                    </article>
                                </div>
                            </div>
                        </section>
                        <section className="">
                            <div className="columns">
                                <div className="column is-full">
                                    <div className="card events-card user-card">
                                        <header className="card-header">
                                            <p className="card-header-title">
                                                Merchant Vessels
                                    </p>
                                        </header>
                                        <div className="card-table">
                                            <div className="content">
                                                {this.renderVessels()}
                                            </div>
                                        </div>
                                        <footer className="card-footer">
                                            <a href="#" className="card-footer-item">View All</a>
                                        </footer>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="">
                            <div class="centered">
                                {loadingSubmit && (
                                    <span className="loading-icon icon is-large">
                                        <i className="fas fa-3x fa-spinner fa-pulse"></i>
                                    </span>
                                )}
                            </div>
                            <div className='field'>
                                <div className='control submit-control'>
                                    <button id="signup-submit-btn" className='button is-primary' onClick={this.onSubmit}>Update</button>
                                </div>
                            </div>
                            <div class="centered">
                                <div id="email-sent-msg-selector" className="field is-below">
                                    {displayMessage}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        auth: state.auth
    }
};

const RegistrarDashboard = connect(
    mapStatetoProps
)(RegistrarDashboardBase);

export default RegistrarDashboard;
