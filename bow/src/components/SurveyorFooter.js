import React, { Component } from 'react';
import '../styles/Footer.scss';
import axios from 'axios';


class SurveyorFooter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bugReportText: ""
        };
    }

    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>Navis Album DRS</strong> by <a href='https://github.com/InDeepShip'>In Deep Ship Inc</a>.
                    </p>
                    <span className="social-media-icons">
                        <a href='https://www.facebook.com/'> <i class="fab fa-facebook-square fa-2x"></i> </a>
                        &nbsp;
                        &nbsp;
                       <a href='https://instagram.com/'> <i class="fab fa-instagram fa-2x"></i></a>
                        &nbsp;
                        &nbsp;
                       <a href='https://twitter.com/'> <i class="fab fa-twitter-square fa-2x"></i></a>
                        &nbsp;
                        &nbsp;
                        <a href='https://linkedin.com/'> <i class="fab fa-linkedin fa-2x"></i></a>
                    </span>
                </div>
            </footer>
        );
    }
}

export default SurveyorFooter;