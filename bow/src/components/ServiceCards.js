import React, { Component } from 'react';
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
                <div className ='columns is-multiline'>
                    <div className='column is-one-fifth' />
                    <div className='column is-one-fifth'>
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Placeholder image" />
                                </figure>
                            </div>
                            <div class="content">
                                <h2>Private Registration</h2>
                                <p>
                                    Private Owners are now able to register
                                    their boats or yachts digitally.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='column is-one-fifth'>
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="https://images.unsplash.com/photo-1524522173746-f628baad3644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1403&q=80" alt="Placeholder image" />
                                </figure>
                            </div>
                            <div class="content">
                                <h2>Commercial Registration</h2>
                                <p>
                                    Registration of commercial shipping vessels
                                    are also able to sail with the Navis Album flag.
                                </p>
                            </div>
                        </div>
                    </div>
                     <div className='column is-one-fifth'>
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src="https://images.unsplash.com/photo-1495657809423-db624a2298dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1366&q=80" alt="Placeholder image" />
                                </figure>
                            </div>
                            <div class="content">
                                <h2>Broker Vessel Tracking</h2>
                                <p>
                                    Keep up to date with all vessel registration
                                    digitally.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='column is-one-fifth' />
                </div>
            </div>
        );
    }
}

export default ServiceCards;