import React, { Component } from 'react';
import '../styles/Footer.scss';
import axios from 'axios';


class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bugReportText: ""
        };
    }

    handleSubmitBugReport() {
        var message = this.state.bugReportText;
        var currentPage = window.location;

        axios
            .post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/bugreport/`, {
                "message": message,
                "currentPage": currentPage.href
            })
            .then(response => { console.log(response.data) });
    }

    handleBugReportText(e) {
        this.setState({
            bugReportText: e.target.value
        });
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
                    <div className="bugReportForm">
                        <br /><br />
                        Please provide brief feedback:
                        <br /><br />
                        <textarea id="bug-report-textbox-selector" align="center" cols="50" rows="10" type='text' onChange={(e) => this.handleBugReportText(e)} />
                        <br /><br />
                        <div align="center">
                            <button id="bug-report-submit-selector" type="button" onClick={() => this.handleSubmitBugReport()} className="button is-normal is-primary">Submit</button>
                        </div>
                    </div>
                    {/* scroll a little past the submit button */}
                        &nbsp;
                    <div ref={this.props.textboxRef}> </div>
                </div>
            </footer>
        );
    }
}

export default Footer;