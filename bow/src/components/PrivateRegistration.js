import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { privateRegistration } from '../actions';
import * as ROUTES from '../constants/routes';
import '../styles/PrivateRegistration.scss';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import InjectedCheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51HrAP1ClBcrzs3YUasdAJPY6kecZuVBFUAqg83Pf3pe4M4d1wcDyksperpVm01cj3oo2yT09sR47SLlbNyQD0pXC00XqFAVtjC');


class PrivateRegistrationBase extends Component {
    constructor(props) {
        super(props);

        const vessel = localStorage.getItem("vesselName")
        const port = localStorage.getItem("selectedPort")

        this.state = {
            name: '',
            vessel: vessel !== null ? vessel : "",
            email: '',
            phone: null,
            address: '',
            port: port !== null ? port : "",
            imo: null,
            tonnage: '',
            propulsion: '',
            builder_name: '',
            builder_address: '',
            yard_number: '',
            date: '',
            vessel_length: '',
            hulls: null,
            agreement: false,
            ports: [],
            curr: 0,
            next: 1,
            propulsion_methods: [],
            agreementError: null
        };

        this.steps = ['Vessel Info', 'Register Info', 'Maker Info', 'Summary', 'Payment'];

        if (this.props.auth && this.props.auth.token) {
            this.state.name = this.props.auth.user.name;
            this.state.email = this.props.auth.user.email;
            this.state.address = this.props.auth.user.address;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handlePagePrevious = this.handlePagePrevious.bind(this);
        this.handlePageNext = this.handlePageNext.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/ports/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then(data => {
                this.setState({
                    "ports": data["ports"],
                    port: data.ports[0]
                })
            });
        fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/api/propulsion_methods/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then(data => {
                this.setState({
                    "propulsion_methods": data["propulsion_methods"],
                    propulsion: data.propulsion_methods[0]
                })
            });
    }

    handleChange(e) {
        if (e.target.name === "agreement") {
            this.setState({ [e.target.name]: e.target.checked })
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    handlePageNext(e) {
        const { curr, next } = this.state;

        // Need to make sure agreement checkbox was selected
        if (this.steps[curr] === 'Summary') {
            if (this.state.agreement) {
                this.setState({
                    curr: curr + 1,
                    next: next + 1,
                    agreementError: ""
                });
            } else {
                this.setState({
                    agreementError: "Need to agree to terms"
                })
            }
        } else {
            this.setState({
                curr: curr + 1,
                next: next + 1
            });
        }

    }

    handlePagePrevious(e) {
        const { curr, next } = this.state;
        this.setState({
            curr: curr - 1,
            next: next - 1
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let formData = Object.assign({}, this.state);
        delete formData.agreement;
        delete formData.curr;
        delete formData.next;
        delete formData.agreementError;

        this.props.register(formData);
    }

    renderContent(index) {

        switch (index) {
            case 0:
                return (
                    <Fragment>
                        <div className="field">
                            <label className="label">Vessel Name</label>
                            <div className="control">
                                <input className="input" name='vessel' type="text" value={this.state.vessel} placeholder="Vessel Name" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Port</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select name='port' value={this.state.port} onChange={this.handleChange}>
                                        {this.renderPorts()}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">IMO (International Maritime Organization) Number</label>
                            <div className='control has-icons-left'>
                                <input className='input' placeholder="" type="text" name="imo" onChange={this.handleChange} />
                                <span className='icon is-small is-left'>
                                    <i className='fas fa-hashtag'></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Gross Tonnage</label>
                            <div className='control has-icons-left'>
                                <input className='input' placeholder="" type="text" name="tonnage" onChange={this.handleChange} />
                                <span className='icon is-small is-left'>
                                    <i className='fas fa-weight-hanging'></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Proposed Registration Date</label>
                            <div className="control">
                                <input className='input' id='regdate' name='date' type="date" onChange={this.handleChange} />
                            </div>
                        </div>
                    </Fragment>
                );
            case 1:
                return (
                    <Fragment>
                        <div className="field">
                            <label className="label">Owner Name</label>
                            <div className="control">
                                <input className="input" name='name' type="text" value={this.state.name} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Contact Email Address</label>
                            <div className='control has-icons-left'>
                                <input className='input' value={this.state.email} type="text" name="email" onChange={this.handleChange} />
                                <span className='icon is-small is-left'>
                                    <i className='fas fa-envelope'></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Phone number</label>
                            <div className='control has-icons-left'>
                                <input className='input' placeholder="1-888-888-8888" type="tel" name="phone" onChange={this.handleChange} />
                                <span className='icon is-small is-left'>
                                    <i className='fas fa-phone'></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Home Address</label>
                            <div className='control has-icons-left'>
                                <input className='input' value={this.state.address} type="text" name="address" onChange={this.handleChange} />
                                <span className='icon is-small is-left'>
                                    <i className='fas fa-home'></i>
                                </span>
                            </div>
                            <p className='help is-danger'>
                            </p>
                        </div>
                    </Fragment>
                );
            case 2:
                return (
                    <Fragment>
                        <div className="field">
                            <label className="label">Builder Name</label>
                            <div className="control">
                                <input className="input" name='builder_name' type="text" placeholder="Builder Name" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Builder Address</label>
                            <div className='control has-icons-left'>
                                <input className='input' placeholder="Builder Address" type="text" name="builder_address" onChange={this.handleChange} />
                                <span className='icon is-small is-left'>
                                    <i className='fas fa-home'></i>
                                </span>
                            </div>
                            <p className='help is-danger'>
                            </p>
                        </div>
                        <div className="field">
                            <label className="label">Yard Number</label>
                            <div className="control">
                                <input className="input" name='yard_number' type="text" placeholder="Yard Number" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Length of Ship</label>
                            <div className="control">
                                <input className="input" name='vessel_length' type="text" placeholder="Length" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Number of Hulls</label>
                            <div className="control has-icons-left">
                                <input className="input" name='hulls' type="text" placeholder="Hulls" onChange={this.handleChange} />
                                <span className='icon is-small is-left'>
                                    <i className='fas fa-hashtag'></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Method of Propulsion</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select name='propulsion' onChange={this.handleChange}>
                                        {this.renderPropulsion()}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                );
            case 3:
                return (
                    <Fragment>
                        <div className="field">
                            <label className="label">Vessel Name</label>
                            <span>{this.state.vessel}</span>
                        </div>
                        <div className="field">
                            <label className="label">Port</label>
                            <span>{this.state.port}</span>
                        </div>
                        <div className="field">
                            <label className="label">IMO (International Maritime Organization) Number</label>
                            <span>{this.state.imo}</span>
                        </div>
                        <div className="field">
                            <label className="label">Gross Tonnage</label>
                            <span>{this.state.tonnage}</span>
                        </div>
                        <div className="field">
                            <label className="label">Proposed Registration Date</label>
                            <span>{this.state.date}</span>
                        </div>
                        <div className="field">
                            <label className="label">Owner Name</label>
                            <span>{this.state.name}</span>
                        </div>
                        <div className="field">
                            <label className="label">Contact Email Address</label>
                            <span>{this.state.email}</span>
                        </div>
                        <div className="field">
                            <label className="label">Phone number</label>
                            <span>{this.state.phone}</span>
                        </div>
                        <div className="field">
                            <label className="label">Home Address</label>
                            <span>{this.state.address}</span>
                        </div>
                        <div className="field">
                            <label className="label">Builder Name</label>
                            <span>{this.state.builder_name}</span>
                        </div>
                        <div className="field">
                            <label className="label">Builder Address</label>
                            <span>{this.state.builder_address}</span>
                        </div>
                        <div className="field">
                            <label className="label">Yard Number</label>
                            <span>{this.state.yard_number}</span>
                        </div>
                        <div className="field">
                            <label className="label">Length of Ship</label>
                            <span>{this.state.vessel_length}</span>
                        </div>
                        <div className="field">
                            <label className="label">Number of Hulls</label>
                            <span>{this.state.hulls}</span>
                        </div>
                        <div className="field">
                            <label className="label">Method of Propulsion</label>
                            <span>{this.state.propulsion}</span>
                        </div>
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                    <input type="checkbox" name='agreement' onChange={this.handleChange} />
                                    <span> I agree that all boat use will be personal and NOT commercial</span>
                                </label>
                                <p className='help is-danger'>
                                    {this.state.agreementError}
                                </p>
                            </div>
                        </div>
                    </Fragment>
                );
            case 4:
                return (
                    <Elements stripe={ stripePromise }>
                        <InjectedCheckoutForm />
                    </Elements>
                );
            default:
                return (
                    <div>No Bueno</div>
                );
        }
    }

    renderPorts() {
        const { ports } = this.state;

        return (
            ports.map((port, index) => {
                return (
                    <option key={index} value={port}>{port}</option>
                );
            })
        );
    }

    renderPropulsion() {
        const { propulsion_methods } = this.state;

        return (
            propulsion_methods.map((opt, key) => {
                return (
                    <option key={key} value={opt}>{opt}</option>
                );
            })
        );
    }

    renderSteps() {
        const { curr, next } = this.state;
        const steps = this.steps;

        return (
            <div className="steps" id="stepsDemo">
                <div className='steps-container'>
                    {
                        steps.map((step, index) => {
                            const isActive = curr == index ? 'is-active' : '';
                            const isComplete = index < curr ? 'is-completed' : '';

                            return (
                                <div className={`step-item ${isActive} ${isComplete}`}>
                                    <div className="step-marker">{index + 1}</div>
                                    <div className="step-details">
                                        <p className="step-title">{step}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="steps-content">
                    {
                        steps.map((step, index) => {
                            const isActive = curr == index ? 'is-active' : '';

                            return (
                                <div className={`step-content ${isActive}`}>{this.renderContent(index)}</div>
                            );
                        })
                    }
                </div>

                <div className="steps-actions">
                    {(curr > 0) && <Fragment>
                        <div className="steps-action">
                            <a
                                href="#"
                                data-nav="previous"
                                className="button is-light"
                                onClick={this.handlePagePrevious}>
                                Previous
                                </a>
                        </div>
                    </Fragment>
                    }
                    {(curr < 4) &&
                        <Fragment>
                            <div className="steps-action">
                                <a
                                    href="#"
                                    data-nav="next"
                                    className="button is-light"
                                    onClick={this.handlePageNext}>
                                    Next
                                </a>
                            </div>
                        </Fragment>
                    }
                    {(curr === 4) &&
                        <Fragment>
                            <div className="steps-action">
                                <button className='button is-primary' onClick={this.onSubmit}>Submit</button>
                            </div>
                        </Fragment>
                    }
                </div>
            </div>
        );
    }

    render() {
        const { error, loading } = this.props;

        if (!this.props.auth || !this.props.auth.token) {
            const pathname = ROUTES.LOGIN
            const thisPage = ROUTES.PRIVATE_REGISTRATION
            return (
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                You need to be logged in to register a vessel
                            </h1>
                            <Link to={{ pathname: pathname, prevPage: thisPage }}>
                                <button className='button is-normal is-primary'>Login</button>
                            </Link >
                        </div>
                    </div>
                </section>
            );
        }

        return (
            <div className='hero' >
                <div className='hero-body'>
                    <div className='container'>
                        {this.renderSteps()}
                        {loading && (
                            <span className="loading-icon icon is-large">
                                <i className="fas fa-3x fa-spinner fa-pulse"></i>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.registration.loading,
        error: state.registration.error,
        message: state.registration.message,
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (registrationForm) => dispatch(privateRegistration(registrationForm))
    };
}

const PrivateRegistration = connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRegistrationBase);

export default withRouter(PrivateRegistration);
