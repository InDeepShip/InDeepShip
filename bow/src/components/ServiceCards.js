import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/ServiceCards.scss';

class ServiceCards extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className='container is-fluid'>
                <div className='columns is-multiline is-centered'>
                    <div className='column is-one-fifth'>
                        <div className="card">
                            <Link className="card-image" to={"/register"}>
                                <figure className="image is-4by3">
                                    <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Placeholder image" />
                                </figure>
                            </Link>
                            <div className='card-content'>
                                <p className="title is-4">Private Registration</p>
                                <div className="content">
                                    Private Owners are now able to register
                                    their boats or yachts digitally.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='column is-one-fifth'>
                        <div className="card">
                            <Link className="card-image" to={"/register"}>
                                <figure className="image is-4by3">
                                    <img src="https://images.unsplash.com/photo-1524522173746-f628baad3644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1403&q=80" alt="Placeholder image" />
                                </figure>
                            </Link>
                            <div className='card-content'>
                                <p className="title is-4">Commercial Registration</p>
                                <div className="content">
                                    Registration of commercial shipping vessels
                                    are also able to sail with the Navis Album flag.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='column is-one-fifth'>
                        <div className="card">
                            <Link className="card-image" to={"/tracking"}>
                                <figure className="image is-4by3">
                                    <img src="https://images.unsplash.com/photo-1495657809423-db624a2298dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1366&q=80" alt="Placeholder image" />
                                </figure>
                            </Link>
                            <div className='card-content'>
                                <p className="title is-4">Broker Vessel Tracking</p>
                                <div className="content">
                                    Keep up to date with all vessel registration
                                    digitally.
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