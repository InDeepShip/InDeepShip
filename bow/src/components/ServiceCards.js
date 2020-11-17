import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/ServiceCards.scss';
import * as ROUTES from '../constants/routes';


class ServiceCards extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className='container has-extra-margin'>
                <div className='columns is-multiline is-centered'>
                    <div className='column is-one-third'>
                        <Link className="card" to={ROUTES.PRIVATE_REGISTRATION_DETAILS}>
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Placeholder image" />
                                </figure>
                            </div>
                            <div className='card-content'>
                                <p className="title">Private Registration</p>
                                <div className="content">
                                    Private Owners are now able to register
                                    their boats or yachts digitally.
                                </div>
                            </div>
                            <div className='card-footer'>
                                <div className="card-footer-item">
                                    Learn More
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='column is-one-third'>
                        <div className="card">
                            <Link className="card-image" to={ROUTES.VESSEL_NAME_LOOKUP}>
                                <figure className="image is-4by3">
                                    <img src="https://images.unsplash.com/photo-1555562791-3cdb883dde6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1268&q=80" alt="Placeholder image" />
                                </figure>
                            </Link>
                            <div className='card-content'>
                                <p className="title">Check Availability of Vessel Name</p>
                                <div className="content">
                                    Check to see if a vessel name is available for
                                    any of the Navis Album ports
                                </div>
                            </div>
                            <div className='card-footer'>
                                <div className="card-footer-item">
                                    Learn More
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='column is-one-third'>
                        <div className="card">
                            <Link className="card-image" to={"/register"}>
                                <figure className="image is-4by3">
                                    <img src="https://images.unsplash.com/photo-1524522173746-f628baad3644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1403&q=80" alt="Placeholder image" />
                                </figure>
                            </Link>
                            <div className='card-content'>
                                <p className="title">Commercial Registration</p>
                                <div className="content">
                                    Registration of commercial shipping vessels
                                    are also able to sail with the Navis Album flag.
                                </div>
                            </div>
                            <div className='card-footer'>
                                <div className="card-footer-item">
                                    Learn More
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='column is-one-third'>
                        <div className="card">
                            <Link className="card-image" to={"/register"}>
                                <figure className="image is-4by3">
                                    <img src="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Placeholder image" />
                                </figure>
                            </Link>
                            <div className='card-content'>
                                <p className="title">Pay Invoice or Make Payment</p>
                                <div className="content">
                                    Pay an invoice for ship registration or make a payment for
                                    documentations.
                                </div>
                            </div>
                            <div className='card-footer'>
                                <div className="card-footer-item">
                                    Learn More
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='column is-one-third'>
                        <div className="card">
                            <Link className="card-image" to={"/tracking"}>
                                <figure className="image is-4by3">
                                    <img src="https://images.unsplash.com/photo-1495657809423-db624a2298dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1366&q=80" alt="Placeholder image" />
                                </figure>
                            </Link>
                            <div className='card-content'>
                                <p className="title">Broker Vessel Tracking</p>
                                <div className="content">
                                    Let us help with up to date vessel registration
                                    digital tracking and renewals.
                                </div>
                            </div>
                            <div className='card-footer'>
                                <div className="card-footer-item">
                                    Learn More
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ServiceCards);
