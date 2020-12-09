import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../styles/PortsCards.scss';

class PortsCards extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderImage(port) {
        switch(port) {
            case "Victoria":
                return <img src="http://www.yachtportcartagena.com/wp-content/uploads/2018/01/Yacht-Port-Cartagena-1-800x800.jpeg" />
            case "Whitby Harbour": case "Scarborough": case "Robin Hood's Bay":
                return <img src="https://www.fishingqueposmanuelantonio.com/wp-content/uploads/2015/06/11223964_717643158365313_7721575619537954388_n.jpg" />
            default:
                return <img src="http://www.travelwith2ofus.com/images/cruise-ship-port-sm2.jpg"></img>
        }
    }

    renderCardContent(port) {
        switch(port) {
            case "Victoria":
                return (
                <div className='card-content'>
                    <div className="content has-text-centered">
                        Yachts registration
                    </div>
                </div>);
            case "Whitby Harbour": case "Scarborough": case "Robin Hood's Bay":
                return (
                    <div className='card-content'>
                        <div className="content has-text-centered">
                            Fishing vessels registration
                        </div>
                    </div>
                );
            default:
                return (
                    <div className='card-content'>
                        <div className="content has-text-centered">
                            Merchant ships registration
                        </div>
                    </div>
                );
        }
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
                        <div className="column port-column" key={index}>
                            <div className="card port-card">
                                <div className="card-header">
                                    <p className="card-header-title is-centered">
                                        {port}
                                    </p>
                                </div>
                                <div className="card-image port-card-image">
                                        <figure className="image">
                                        {this.renderImage(port)}
                                        </figure>
                                </div>
                                {this.renderCardContent(port)}
                                
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