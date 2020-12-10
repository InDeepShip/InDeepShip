import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import qs from 'query-string';
import * as actions from '../actions';
import RegistrationCard from './RegistrationCard';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class RegistrationView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // allShips: [],
            registrations: [],
            message: "",
            failed: false,
            loading: true
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.getRegistration();
    }

    getRegistration() {
        const { email } = this.props.auth.user;

        let imo;
        if (this.props.match && this.props.match.params && this.props.match.params.imo) {
            imo = this.props.match.params.imo;
        } else {
            const args = qs.parse(this.props.location.search);
            imo = args.imo ? args.imo : '';
        }

        const payload = {
            params: {
                email: email,
                imo: imo
            }
        };

        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/single_registration/`,
            payload
        ).then((response) => {
            this.setState({
                registrations: response.data,
                loading: false,
            });
        })
            .catch((error) => {
                this.setState({
                    registrations: [],
                    message: error.response.data.message,
                    failed: true,
                    loading: false,
                });
            });
    }

    // general displaying of registration cards
    displayRegistration(mod, eq) {
        const { registrations } = this.state;
        return (
            <React.Fragment>
                {registrations.map((registration, index) => (
                    <RegistrationCard
                        key={registration.id}
                        registration={{
                            id: registration.id,
                            port: registration.port,
                            vessel: registration.vessel,
                            tonnage: registration.tonnage,
                            propulsion: registration.propulsion,
                            yard_number: registration.yard_number,
                            vessel_length: registration.vessel_length,
                            hulls: registration.hulls,
                            purpose: registration.purpose,
                            start_date: registration.start_date,
                            expiration_date: registration.expiration_date,
                            owner: registration.owner
                        }}
                        index={index + 1}
                    />
                ))}
            </React.Fragment>
        );
    }

    warningMessage() {
        const { failed, message } = this.state;

        if (failed) {
            return (
                <div className="message is-danger">
                    <div className="message-body">{message ? message : "Invalid or missing API Key"}</div>
                </div>
            )
        }
    }

    render() {
        const { loading, registrations } = this.state;


        if (loading) {
            return <Spinner fullPage />;
        }

        return (
            <section className="section">
                <div className="container">
                    <div className="columns is-multiline">
                        <div className="column is-full">
                            {this.displayRegistration()}
                            {registrations.length ? null : (
                                <div className="has-text-centered title">
                                    No Registrations under that Ship!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="App" />
            </section>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

const RegistrationViewConnect = connect(
    mapStatetoProps,
    mapDispatchToProps
)(RegistrationView);

export default withRouter(RegistrationViewConnect);