import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image, Font, PDFViewer, Canvas } from '@react-pdf/renderer';
// import PDFKit from 'pdfkit';
import { connect } from 'react-redux';
import axios from 'axios';
import '../styles/PrivateDashboard.scss';
import { VESSEL_NAME_LOOKUP } from '../constants/routes';
import brandingImg from '../assets/our_flag.png';
import watermark from "../assets/watermark.png"
import signature from "../assets/signature.png"
import coatOfArms from "../assets/Coat_of_arms_of_the_United_Kingdom_(black_and_white).jpg"

const styles = StyleSheet.create({
    page: {
        // flexDirection: 'row',
        // backgroundColor: '#FFFFFF'
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'Times-Roman',
        paddingVertical: 10,
    },
    subtitle: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Times-Roman',
    },
    footer: {
        fontSize: 12,
        textAlign: 'left',
        fontFamily: 'Times-Roman',
    },
    footer2: {
        fontSize: 8,
        textAlign: 'left',
        fontFamily: 'Times-Roman',
    },
    section: {
        fontSize: 11,
        marginTop: 12,
        fontFamily: 'Times-Roman',
        fontWeight: 'bold',
        borderBottomColor: '#000000',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text: {
        marginTop: 10,
        // padding: 10,
        paddingRight: 5000,
        fontSize: 12,
        textAlign: 'left',
        fontFamily: 'Times-Roman',
        letterSpacing: 0.5,
    },
    watermark: {
        position: 'absolute',
        bottom: 250,
        right: 0,
        width: 250,
        height: 250,
    },
    image: {
        width: 100,
        height: 50,
    },
    image2: {
        width: 100,
        height: 30,
    },
    signature: {
        width: 200,
        height: 50,
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        // color: 'grey',
    },
});

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const MyDocument = ({ name, registration }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View>
                <Text style={styles.title}><Image style={styles.image2} src={brandingImg} /> CERTIFICATE OF <Image style={styles.image} src={coatOfArms} /> NAVIS ALBUM REGISTRY</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.subtitle}>The Merchant Shipping Act 1995</Text>
                <Text style={styles.subtitle}>The Merchant Shipping (Registration of Ships) Regulations 1993, as amended</Text>
            </View>

            <View>
                <Text style={styles.section}>PARTICULARS OF SHIP</Text>
            </View>

            <View>
                <Text style={styles.text}>Name of Ship                                         {registration.vessel}</Text>
                <Text style={styles.text}>Official Number</Text>
                <Text style={styles.text}>IMO Number / HIN                            {registration.imo}</Text>
                <Text style={styles.text}>Method of Propulsion                        {registration.propulsion}</Text>
                <Text style={styles.text}>Engine Make & Model</Text>
                <Text style={styles.text}>Total Engine Power</Text>
                <Text style={styles.text}>Length                                                       {registration.vessel_length}  meters</Text>
                <Text style={styles.text}>Depth</Text>
                <Text style={styles.text}>Number of Hulls                                   {registration.hulls}</Text>
                <Text style={styles.text}>Gross Tonnage                                       {registration.tonnage}</Text>
                <Text style={styles.text}>Registered Tonnage                             {registration.tonnage}</Text>
                <Text style={styles.text}>Year of Build</Text>
                <Text style={styles.text}>Name of Builder                                   {registration.builder_name}</Text>
                <Text style={styles.text}>Country of Build                                  {registration.builder_address}</Text>
                <Text style={styles.text}>Yard Number                                         {registration.yard_number}</Text>
                <Text style={styles.text}>Radio Call Sign</Text>
                <Text style={styles.text}>Port                                                            {registration.port}</Text>
            </View>

            <View style={styles.section} />

            <View>
                <Text style={styles.text}>This Certificate was issued on        {registration.date}</Text>
                <Text style={styles.text}>This Certificate expires on               {registration.date.replace('2020', '2021')}</Text>
                <Text style={styles.text}>Signed <Image style={styles.signature} src={signature} /></Text>
                <View style={{marginBottom:12}}/>
                <Text style={styles.footer}>For and on behalf of the Director General, Department of Transport</Text>
                <View style={{marginBottom:6}}/>
                <Text style={styles.footer2}>By the Registry of Shipping, an Executive Agency of the Government of Navis Album</Text>
            </View>

            <View style={styles.watermark}>
                <Image src={watermark} />
            </View>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} of ${totalPages}`
            )} fixed />
        </Page>

        <Page size="A4" style={styles.page}>
            <View>
                <Text style={styles.section}>PARTICULARS OF SHIP</Text>
                <Text style={styles.text}>Name of Ship                                         {registration.vessel}</Text>
                <Text style={styles.text}>Official Number</Text>
                <Text style={styles.text}>IMO Number / HIN                             {registration.imo}</Text>
            </View>

            <View style={{marginBottom:12}}/>

            <View>
                <Text style={styles.section}>OWNERSHIP DETAILS</Text>
                <Text style={styles.text}>Name                                                         {name}</Text>
                <Text style={styles.text}>Email                                                         {registration.email}</Text>
                <Text style={styles.text}>Phone Number                                      {registration.phone}</Text>
                <Text style={styles.text}>Address                                                    {registration.address}</Text>

            </View>
            <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                `${pageNumber} of ${totalPages}`
            )} fixed />
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
        const { name } = this.props.auth.user;

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
                                let formData = localStorage.getItem(vessel.imo);

                                if (formData) {
                                    let jsonData = JSON.parse(formData);
                                    return (
                                        <tr key={index}>
                                            <td>{vessel.name}</td>
                                            <td>{vessel.port}</td>
                                            <td>{vessel.imo}</td>
                                            <td>{vessel.status}</td>
                                            <td>
                                                <PDFDownloadLink className="button is-primary" document={<MyDocument name={name} registration={jsonData} />} fileName="registration.pdf">
                                                    {({ blob, url, loading, error }) => (loading ? 'Download' : 'Download')}
                                                </PDFDownloadLink>
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    return (
                                        <tr key={index}>
                                            <td>{vessel.name}</td>
                                            <td>{vessel.port}</td>
                                            <td>{vessel.imo}</td>
                                            <td>{vessel.status}</td>
                                            <td>
                                                <button className="button is-primary">
                                                    Download
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }
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
                    <div className="column">
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
