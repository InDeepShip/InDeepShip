import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import * as actions from '../actions';
import ShipCard from './ShipCard';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

document.body.classList.remove('has-navbar-fixed-top');
class ShipView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // allShips: [],
            ships: [],
            api_key: "",
            failed: false,
            key_entered: false,
            message: "",
            loading: true
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        // this.getShips();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            key_entered: true,
            failed: false
        });
        this.getShips();
    }

    getShips() {
        // TODO: filter ships by api key
        console.log(this.state.api_key)
        const { ships, loading, api_key } = this.state;
        console.log(api_key.length)
        this.setState({
            ships,
            loading: true,
        });

        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/vessels/`,
            { headers: { 'api-key': api_key } }
        )
            .then((response) => {
                console.log(response)
                this.setState({
                    ships: response.data.vessels,
                    loading: false,
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    ships,
                    api_key: "",
                    key_entered: false,
                    failed: true,
                    message: error.response.data.message,
                    loading: false,
                });
            });
    }


    // Used to display ship cards in a specific grid
    // formatShip(mod, eq) {
    //     const { ships } = this.state;
    //     return (
    //         <React.Fragment>
    //             {ships.filter((_, index) => (index % mod) === eq).map(ship => (
    //                 <ShipCard
    //                     key={ship.officialNumber}
    //                     ship={{
    //                         officialNumber: ship.officialNumber,
    //                         name: ship.name,
    //                         type: ship.type,
    //                         keelLayingDate: ship.keelLayingDate,
    //                         grossTonnage: ship.grossTonnage,
    //                         hin: ship.hin,
    //                         callSign: ship.callSign,
    //                         mmsi: ship.mmsi,
    //                         imoNumber: ship.imoNumber,
    //                         registeredLength: ship.registeredLength,
    //                         registration: ship.registration,
    //                         builder: ship.builder,
    //                         managingCompany: ship.managingCompany,
    //                         engines: ship.engines,
    //                         // api_key: ship.api_key,
    //                     }}
    //                 />
    //             ))}
    //         </React.Fragment>
    //     );
    // }

    // general displaying of ship cards
    displayShip(mod, eq) {
        const { ships } = this.state;
        return (
            <React.Fragment>
                {ships.map((ship, index) => (
                    <ShipCard
                        key={ship.officialNumber}
                        ship={{
                            officialNumber: ship.officialNumber,
                            name: ship.name,
                            type: ship.type,
                            keelLayingDate: ship.keelLayingDate,
                            grossTonnage: ship.grossTonnage,
                            hin: ship.hin,
                            callSign: ship.callSign,
                            mmsi: ship.mmsi,
                            yearOfBuild: ship.yearOfBuild,
                            imoNumber: ship.imoNumber,
                            registeredLength: ship.registeredLength,
                            registration: ship.registration,
                            builder: ship.builder,
                            managingCompany: ship.managingCompany,
                            engines: ship.engines,
                            // api_key: ship.api_key,
                        }}
                        index={index + 1}
                    />
                ))}
            </React.Fragment>
        );
    }

    warningMessage() {
        const { failed, message} = this.state;

        if (failed) {
            return (
                <div className="message is-danger">
                    <div className="message-body">{message ? message: "Invalid or missing API Key"}</div>
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

const ShipViewConnect = connect(
    mapStatetoProps,
    mapDispatchToProps
)(ShipView);

export default withRouter(ShipViewConnect);