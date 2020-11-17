import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { privateRegistration } from '../actions';
import * as ROUTES from '../constants/routes';
import * as ENVIRON from '../constants/environment';


class PrivateRegistrationBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            vessel: '',
            email: '',
            phone: null,
            address: '',
            port: '',
            imo: null,
            tonnage: '',
            propulsion: '',
            builder_name: '',
            builder_address: '',
            yard_number: '',
            date: '',
            vessel_length: '',
            hulls: null,
            agreement: '',
            ports: [],
            curr: 0,
            next: 1
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        fetch(`${ENVIRON.DEPLOYMENT_SERVER_ADDRESS}/api/ports/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        }).then((response) => response.json())
        .then(data => {
            this.setState({
            "ports": data["ports"]
            })
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        let formData = Object.assign({}, this.state);
        delete formData.agreement;

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
                                <input className="input" name='vessel' type="text" placeholder="Vessel Name" onChange={this.handleChange} />
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
                                <input className="input" name='name' type="text" placeholder="Name" onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Contact Email Address</label>
                            <div className='control has-icons-left'>
                                <input className='input' placeholder="Email address" type="text" name="email" onChange={this.handleChange} />
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
                                <input className='input' placeholder="Address" type="text" name="address" onChange={this.handleChange} />
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
                                <input className="input" name='builder_name' type="text" placeholder="Builder Name" onChange={this.handleChange}/>
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
                                <input className="input" name='vessel_length' type="text" placeholder="Length" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Number of Hulls</label>
                            <div className="control has-icons-left">
                                <input className="input" name='hulls' type="text" placeholder="Hulls" onChange={this.handleChange}/>
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
                        <div>Need to Implement</div>
                    </Fragment>
                );
            case 4:
                return (
                    <Fragment>
                        <div className="field">
                            <div className="control">
                                <label className="checkbox">
                                <input type="checkbox" name='agreement' onChange={this.handleChange} />
                                    <span> I agree that all boat use will be personal and NOT commercial</span>
                                </label>
                            </div>
                        </div>
                    </Fragment>
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
        const propulsions  = ['Diesel', 'Gas Turbine', 'Fuel Cell', 'Solar', 'Water-Jet'];

        return (
            propulsions.map((opt, key) => {
                return (
                    <option key={key} value={opt}>{opt}</option>
                );
            })
        );
    }

    renderSteps() {
        const { curr, next } = this.state;
        const steps = ['Vessel Info', 'Register Info', 'Maker Info', 'Payment', 'Summary'];

        return (
            <div className="steps" id="stepsDemo">
                {
                    steps.map((step, index) => {
                        const isActive = curr == index ? 'is-active' : '';
                        const isComplete = index < curr ? 'is-completed': '';

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
                    {(curr > 0) &&    <Fragment>
                            <div className="steps-action">
                                <a
                                    href="#"
                                    data-nav="previous"
                                    className="button is-light"
                                    onClick={() => this.setState({ curr: curr - 1, next: next - 1})}>
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
                                    onClick={() => this.setState({ curr: curr + 1, next: next + 1})}>
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
        const { error, loading} = this.props;

        if (!this.props.auth) {
            return (
                <div className='container'>
                    You need to be logged in to register a vessel. <Link to={ROUTES.LOGIN}>Login ?</Link>
                </div>
            );
        }

        return (
            <div className='hero'>
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