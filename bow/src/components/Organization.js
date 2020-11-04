import React, { Component } from 'react';
import brandingImg from '../assets/our_flag.png';
import '../styles/Organization.scss';

class Organization extends Component {
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
                                    Organization Title
                                </h1>
                                <h2 className='sub-title'>
                                    Our Organzation stands for FREEDOM
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

export default Organization;