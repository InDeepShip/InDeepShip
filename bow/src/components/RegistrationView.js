import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import * as actions from '../actions';
import ShipCard from './ShipCard';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class RegistrationView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // allShips: [],
            registrations: [],
            message: "",
            loading: true
        };
    }

    // async componentDidMount() {
    // let imo;
    // if (this.props.match && this.props.match.params && this.props.match.params.imo) {
    //     imo = this.props.match.params.imo;
    // } else {
    //   const args = qs.parse(this.props.location.search);
    //   imo = args.imo ? args.imo : '';
    // }
    //     // console.log(imo)

    //     const post = await axios.get('/api/research_posts/', {
    //       params: {
    //         id,
    //         fill: true,
    //       },
    //     });

    //     this.setState({
    //       post: post.data,
    //       hasApplied: applied.data,
    //       responses: responses
    //     });    
    //   }

    componentDidMount() {
        this.setState({ loading: true });
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
                imo: imo,
            }
        };

        const registrations = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/single_registration/`,
            payload
        ).then((response) => {
            console.log(response)
            this.setState({
                registrations: registrations.data,
                loading: false,
            });
        })
            .catch((error) => {
                console.log(error);
                this.setState({
                    registrations,
                    message: error.response.data.message,
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
                    <ShipCard
                        key={registration.vessel.imo}
                        registration={{
                            name: registration.name,
                            port: registration.port,
                            imo: registration.vessel.imo,
                            tonnage: registration.tonnage,
                            propultion: registration.propultion,
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
        const { loading, ships, key_entered } = this.state;

        if (!key_entered) {
            return (
                <div className='hero is-full-height'>
                    <div className='hero-body'>
                        <section className="section">
                            <div className="container">
                                {this.warningMessage()}
                                <div className='field has-addons'>
                                    <div className="control is-expanded">
                                        <input id="api_key-input" className="input" type="text" placeholder="API Key" name="api_key" onChange={this.handleChange}></input>
                                    </div>
                                    <div className="control">
                                        <a id="api_key-Submit" className="button is-primary" onClick={this.onSubmit}>Submit</a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            )
        }

        if (loading) {
            return <Spinner fullPage />;
        }

        return (
            <section className="section">
                <div className="container">
                    {/* <div className="columns">
                        <div className="column" style={{ marginBottom: '1em' }}>
                            <div className="field">
                                <div className="control">
                                    <input className={`input is-medium ${!ships.length ? 'is-danger' : ''}`} type="text" placeholder="Register some Ships to see them here!"/>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="columns is-multiline">
                        {/* <div className="column is-full">
                            {this.formatShip(3, 0)}
                        </div> */}
                        <div className="column is-full">
                            {/* {this.formatShip(3, 1)} */}
                            {this.displayShip()}
                            {ships.length ? null : (
                                <div className="has-text-centered title">
                                    No ships assigned!
                                </div>
                            )}
                        </div>
                        {/* <div className="column is-full">
                            {this.formatShip(3, 2)}
                        </div> */}
                    </div>
                </div>
                <div className="App" />
                {ships.length ? (
                    <div className="container is-size-3">
                        <center>None left to see!</center>
                    </div>
                ) : null}
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