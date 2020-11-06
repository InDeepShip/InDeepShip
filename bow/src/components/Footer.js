import React, { Component } from 'react';
import '../styles/Footer.scss';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <footer class="footer">
                <div class="content has-text-centered">
                    <p>
                        <strong>Navis Album DRS</strong> by <a href='https://github.com/InDeepShip'>In Deep Ship Inc</a>.
                    </p>
                </div>
            </footer>
       );
    }
}

export default Footer;