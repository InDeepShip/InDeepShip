import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import '../styles/ErrorPage.scss';

class ErrorPage extends Component {
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
                            <div className="column is-4 error-page-column">
                                <section>
                                <h1 className="title">Error Submitting Payment</h1>
                                    <span className="icon has-text-danger">
                                        <i className="fas fa-3x fa-ban"></i>
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

export default ErrorPage;