import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import '../styles/PrivateRegistrationDetails.scss';

class PrivateRegistrationDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className='container'>
                <div className='columns private-registration-columns'>
                    <div className='column is-3 menu-container'>
                        <div className='boxed sidebar-box register-menu'>
                            <aside className='menu is-hidden-mobile'>
                                <p className='menu-label'>Why Register A Vessel?</p>
                                <p className='menu-label'>Steps To Register A Vessel</p>
                                <p className='menu-label'>General Registration Information</p>
                            </aside>
                        </div>
                    </div>
                    <div className='column is-9'>
                        <section className="hero is-primary welcome is-small">
                            <div className="hero-body">
                                <div className="container">
                                    <h1 className="title">
                                        Private Registration Details
                                    </h1>
                                </div>
                            </div>
                        </section>
                        <section className="section">
                            <div className="container">
                                <h1 className="title">Why Register A Vessel?</h1>
                                <p>
                                    <ol className="list">
                                        <li>
                                            We are committed to providing quality service
                                        </li>
                                        <li>
                                            Reputable - Industry recognition as a top-quality flag state
                                        </li>
                                        <li>
                                            Competitive fees: fixed annual fee for technical services, ship-certificates and ship documents
                                        </li>
                                    </ol>
                                </p>
                            </div>
                        </section>
                        <section className="section">
                            <div className="container">
                                <h1 className="title">Steps To Register A Vessel</h1>
                                    <h2 className="subtitle">
                                        1. Create Account
                                    </h2>
                                    <p className="register-paragraph">
                                        Make sure to register for an account. Need to provide general information such as name and email
                                        in order to make sure we can contact you about your requests.
                                    </p>
                                    <h2 className="subtitle">
                                        2. Qualification of Vessel and Vessel Name Availability
                                    </h2>
                                    <p className="register-paragraph">
                                        First we need to determine whether the vessel itself qualifies for private registration. This verification
                                        will be determine by the parameters of the vessel. Additionally, we need to establish wheterh the vessel
                                        name is available and if so, for which ports.
                                    </p>
                                    <p className="register-paragraph">
                                        There are 7 ports currently, but will be reduced down to 6 (with the merge between Barrow North and Barrow South).
                                        If name is not available in onr port, it could be available in another port. Given that the name is available,
                                        an owner can reserve the name for a period of 12 months. This reservation will also be capable of renewal.
                                    </p>
                                    <h2 className="subtitle">
                                        3. Proof of Legal Title
                                    </h2>
                                    <p className="register-paragraph">
                                        We need to establish whether the owner is bona-fide and qualified to own a Navis Album flagged vessel.
                                        This will be done by determining of the owner has legal title to the vessel with no pre-existing conditions prohibiting
                                        the vessel from being registered with Navis Album.
                                    </p>
                                    <h2 className="subtitle">
                                        4. Fill Registration Form
                                    </h2>
                                    <p className="register-paragraph">
                                        Link to the registration for is below. All fields must be completed in order to get a rapid approval for your
                                        vessel registration.

                                    </p>
                                    <p className="register-paragraph">
                                        <Link to={ROUTES.PRIVATE_REGISTRATION}>
                                            <button className='button is-normal is-primary'>Registration Form</button>
                                        </Link>
                                    </p>
                                    <h2 className="subtitle">
                                        5. Payment Method and Submit Application
                                    </h2>
                                    <p className="register-paragraph">
                                        Add card and account payment information to successfully submit application.
                                        We will notify you about the request and any notification of the status of the request
                                        will be reflected on your account dashboard.
                                    </p>
                            </div>
                        </section>
                        <section className="section">
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PrivateRegistrationDetails);