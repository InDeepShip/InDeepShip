import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import '../styles/SuccessPage.scss';

class SuccessPage extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-4 success-page-column">
                                <section>
                                <h1 className="title">Successfully Submitted Payment</h1>
                                    <span className="icon has-text-success">
                                        <i className="fas fa-3x fa-check-circle"></i>
                                    </span>
                                </section>
                                <Link as="button" className="button is-primary" to={ROUTES.LANDING}>
                                    Back Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default SuccessPage;