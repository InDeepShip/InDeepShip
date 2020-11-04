import React, { Component } from 'react';
import brandingImg from '../assets/our_flag.png';
import '../styles/Services.scss';

class Services extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <section className='hero is-large'>
                <div className='hero-body'>
                    <div className='container'>
                        <div className='columns is-vcentered'>
                            <div className='column is-6'>
                                <h1 className='title'>
                                    Services Us
                                </h1>
                                <h2 className='sub-title'>
                                    We provide a variety of services to accomidate your digital registration experience
                                </h2>
                            </div>
                            <div className='column is-5 has-text-centered'>
                                <img src={brandingImg} alt="Logo" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Services;