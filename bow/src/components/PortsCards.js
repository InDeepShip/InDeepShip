import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/PortsCards.scss';

class PortsCards extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
        <div>
            <div className="content has-text-centered ports-header">           
                <p className="title is-5">
                    PORTS ACCEPTING REGISTRATION
                </p>
            </div>
        <section className="port-cards-container">
          <div className="columns is-multiline is-centered is-vcentered">
            {this.props.ports.map((port, index) => {
                      return (
                        <div className="port-column port-card">
                            <div className="content has-text-centered">
                                <p className="title is-6">
                                    {port}
                                </p>
                            </div>
                            <div className="port-card-image">
                                <div className="media">
                                    <figure className="port-card-image">
                                        <img className="is-rounded" src="http://www.travelwith2ofus.com/images/cruise-ship-port-sm2.jpg"></img>
                                    </figure>
                                </div>
                            </div>
                        </div>
                      );
                  }
            )}
          { this.props.loading &&
            <span className="loading-icon icon is-large">
              <i className="fas fa-3x fa-spinner fa-pulse"></i>
            </span>
          }
          </div>
        </section>
        </div>
        
        );
    }

}

export default PortsCards