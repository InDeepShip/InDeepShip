import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image, Font, PDFViewer } from '@react-pdf/renderer';
import { connect } from 'react-redux';
import axios from 'axios';
import '../styles/PrivateDashboard.scss';
import { VESSEL_NAME_LOOKUP } from '../constants/routes';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  image: {
    height: 150,
    marginBottom: 30,
    marginHorizontal: 100,
  },
});

const MyDocument = ({ name, registration }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Name: {name}</Text>
        <Text>Email: {registration.email}</Text>
        <Text>Phone: {registration.phone}</Text>
        <Text>Address: {registration.address}</Text>
        <Text>Vessel: {registration.vessel}</Text>
        <Text>Port: {registration.port}</Text>
        <Text>IMO: {registration.imo}</Text>
        <Text>Builder: {registration.builder_name}</Text>
        <Text>Builder Address: {registration.builder_address}</Text>
        <Text>Yard Number: {registration.yard_number}</Text>
        <Text>Registration Date: {registration.date}</Text>
        <Text>Hulls: {registration.hulls}</Text>
        <Text>Gross Tonnage: {registration.tonnage}</Text>
        <Text>Method of Propulsion: {registration.propulsion}</Text>
        <Text>Vessel Length: {registration.vessel_length}</Text>
      </View>
      <View style={styles.image}>
        <Image src="../assets/Coat_of_arms_of_the_United_Kingdom_(black_and_white).svg" />
      </View>
    </Page>
  </Document>
);



class PrivateDashboardBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vessels: [],
            registrationCount: 0,
            loading: true
        };

        this.state.formData = JSON.parse(localStorage.getItem('IMO'))
        this.state.name = this.props.auth.user.name;
    }

    componentDidMount() {
        const { email } = this.props.auth.user;
        const payload = {
            params: {
                email: email
            }
        };

        axios
            .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/vesselstatus/`, payload)
            .then((res) => {
                this.setState({
                    vessels: res.data.ships,
                    registrationCount: res.data.ships.length,
                    loading: false
                });
            })
            .catch((err) => {
                console.log('Error getting status for vessels');
            })

    }

    renderVessels() {
        const { name, formData } = this.state;
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
                            <th>Port</th>
                            <th>IMO</th>
                            <th>Status</th>
                            <th>Registration PDF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vessels.map((vessel, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{vessel.name}</td>
                                        <td>{vessel.port}</td>
                                        <td>{vessel.imo}</td>
                                        <td>{vessel.status}</td>
                                        <td>
                                            <PDFDownloadLink className="button is-primary" document={<MyDocument name={name} registration={formData} />} fileName="registration.pdf">
                                            {({ blob, url, loading, error }) => (loading ? 'Download' : 'Download')}
                                            </PDFDownloadLink>
                                        </td>
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
                                        <p className="title">{this.state.registrationCount}</p>
                                        <p className="sub-title">Registrations</p>
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
                                                Registrations
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
                            <div className="columns">
                                <div className="column is-full">
                                    <div className="card user-card">
                                        <div className="card-header">
                                            <p className="card-header-title">
                                                Vessel Name Search
                                    </p>
                                        </div>
                                        <div className="card-content">
                                            <div className="content">
                                                <div className="control has-icons-left has-icons-right">
                                                    <input className="input is-medium" type="text" placeholder="" />
                                                    <span className="icon is-medium is-left">
                                                        <i className="fa fa-search" />
                                                    </span>
                                                    <span className="icon is-medium is-right">
                                                        <i className="fa fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card user-card">
                                        <div className="card-header">
                                            <p className="card-header-title">
                                                User Search
                                    </p>
                                        </div>
                                        <div className="card-content">
                                            <div className="content">
                                                <div className="control has-icons-left has-icons-right">
                                                    <input className="input is-medium" type="text" placeholder="" />
                                                    <span className="icon is-medium is-left">
                                                        <i className="fa fa-search" />
                                                    </span>
                                                    <span className="icon is-medium is-right">
                                                        <i className="fa fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

const PrivateDashboard = connect(
    mapStatetoProps
)(PrivateDashboardBase);

export default PrivateDashboard;
