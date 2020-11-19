import React, { Component } from 'react';
import { connect } from 'react-redux';


class DashboardBase extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <div className="columns">
                <div className="column is-3">
                    <aside className="menu is-hidden-mobile">
                        <p className="menu-label">General</p>
                        <ul className="menu-list">
                            <li>Dashboard</li>
                            <li>Customers</li>
                        </ul>
                        <p className="menu-label">Administration</p>
                        <ul className="menu-list">
                            <li>List Item 1</li>
                            <li>List Item 2</li>
                        </ul>
                        <p className="menu-label">Transactions</p>
                        <ul className="menu-list">
                            <li>Payments</li>
                            <li>Balance</li>
                            <li>Reports</li>
                        </ul>
                    </aside>
                </div>
                <div className="column is-9">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li>General</li>
                            <li>Dashboard</li>
                        </ul>
                    </nav>
                    <section className="hero is-primary welcome is-small">
                        <div className="hero-body">
                            <div className="container">
                                <h1 className="title">
                                    Hello, User
                                </h1>
                                <h2 className="sub-title">Hope you are having a great day!</h2>
                            </div>
                        </div>
                    </section>
                    <section className="info-tiles">
                        <div className="tile is-ancestor has-text-centered">
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">0</p>
                                    <p className="sub-title">Notifications</p>
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile is-child box">
                                    <p className="title">0</p>
                                    <p className="sub-title">Registrations</p>
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
                                    <p className="sub-title">Reward Points</p>
                                </article>
                            </div>
                        </div>
                    </section>
                    <div className="columns">
                        <div className="column is-6">
                            <div className="card events-card">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Events
                                    </p>
                                </header>
                                <div className="card-table">
                                    <div className="content">
                                        <table className="table is-full-width is-striped">
                                            <tbody>
                                                <tr>
                                                    <td width="5%">Hi</td>
                                                    <td>Some data</td>
                                                    <td>
                                                        <a href="#" className="button is-small is-primary">Action</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a href="#" className="card-footer-item">View All</a>
                                </footer>
                            </div>
                        </div>
                        <div className="column is-6"></div>
                    </div>
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

const Dashboard = connect(
    mapStatetoProps
)(DashboardBase);

export default Dashboard;
