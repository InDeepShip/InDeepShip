import React, { Component } from 'react';
import '../styles/ContactUs.scss';

class ContactUs extends Component {
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
                                    Contact Us
                                </h1>
                                <h2 className='sub-title'>
                                    Contact Us via Email
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

export default ContactUs;