import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { registrationFail } from '../actions';


class ShipCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { ship, index } = this.props;
    return (
      <div key={ship.officialNumber} className="card" style={{ borderRadius: '5px', marginBottom: '2.5em' }}>
        <div className="card-image has-text-centered" style={{ top: '-1em' }}>
          {/* <figure className="image is-4by3">
            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Placeholder image" />
          </figure> */}
        </div>
        <div className="card-header">
          <p className="card-header-title title">Vessel {index}</p>
        </div>
        <div className="card-content" style={{ paddingTop: '0.5rem' }}>
          <p className="is-6"><b>officialNumber: </b>{ship.officialNumber}</p>
          <p className="is-6"><b>name: </b>{ship.name}</p>
          <p className="is-6"><b>type: </b>{ship.type}</p>
          <p className="is-6"><b>keelLayingDate: </b>{ship.keelLayingDate}</p>
          <p className="is-6"><b>grossTonnage: </b>{ship.grossTonnage}</p>
          <p className="is-6"><b>hin: </b>{ship.hin}</p>
          <p className="is-6"><b>callSign: </b>{ship.callSign}</p>
          <p className="is-6"><b>mmsi: </b>{ship.mmsi}</p>
          <p className="is-6"><b>imoNumber: </b>{ship.imoNumber}</p>
          <p className="is-6"><b>yearOfBuild: </b>{ship.yearOfBuild}</p>
          <p className="is-6"><b>registeredLength: </b>{ship.registeredLength}</p>
          <div className="is-6"><b>registration: </b>
            <div className="pl-5">
              <p className="is-6"><b>status: </b>{ship.registration.status}</p>
            </div>
          </div>
          <div className="is-6"><b>builder: </b>
            <div className="pl-5">
              <div className="is-6"><b>address: </b>
                <div className="pl-5">
                  <p className="is-6"><b>lineOne: </b>{ship.builder.address.lineOne}</p>
                  <p className="is-6"><b>lineTwo: </b>{ship.builder.address.lineTwo}</p>
                  <p className="is-6"><b>lineThree: </b>{ship.builder.address.lineThree}</p>
                  <p className="is-6"><b>postcode: </b>{ship.builder.address.postcode}</p>
                </div>
              </div>
              <p className="is-6"><b>email: </b>{ship.builder.email}</p>
              <p className="is-6"><b>name: </b>{ship.builder.name}</p>
              <p className="is-6"><b>telephone: </b>{ship.builder.telephone}</p>
            </div>
          </div>
          <div className="is-6"><b>managingCompany: </b>
            <div className="pl-5">
              <div className="is-6"><b>address: </b>
                <div className="pl-5">
                  <p className="is-6"><b>lineOne: </b>{ship.managingCompany.address.lineOne}</p>
                  <p className="is-6"><b>lineTwo: </b>{ship.managingCompany.address.lineTwo}</p>
                  <p className="is-6"><b>lineThree: </b>{ship.managingCompany.address.lineThree}</p>
                  <p className="is-6"><b>postcode: </b>{ship.managingCompany.address.postcode}</p>
                </div>
              </div>
              <p className="is-6"><b>email: </b>{ship.managingCompany.email}</p>
              <p className="is-6"><b>name: </b>{ship.managingCompany.name}</p>
              <p className="is-6"><b>telephone: </b>{ship.managingCompany.telephone}</p>
            </div>
          </div>
          <div className="is-6"><b>engines: </b>
            {ship.engines.map((engine, index) => (
              <div key={index} className="pl-5">
                <p className="is-6"><b>kW: </b>{engine.kW}</p>
                <p className="is-6"><b>manufacturer: </b>{engine.manufacturer}</p>
                <p className="is-6"><b>model: </b>{engine.model}</p>
              </div>
            ))}
          </div>
          {/* <p className="is-6"><b>api_key: </b>{ship.api_key}</p> */}
        </div>

        {/* TODO: button to mark as complete */}
        {/* <footer className="card-footer">
          <Link className="card-footer-item has-text-success" to={`/ship/${ship.officialNumber}`}>
            Details
          </Link>
        </footer> */}
      </div>
    );
  }
}

export default withRouter(ShipCard);
