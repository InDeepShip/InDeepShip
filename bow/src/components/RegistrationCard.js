import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { registrationFail } from '../actions';


class RegistrationCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { registration, index } = this.props;
    return (
      <div key={registration.id} className="card" style={{ borderRadius: '5px', marginBottom: '2.5em' }}>
        <div className="card-image has-text-centered" style={{ top: '-1em' }}>
          {/* <figure className="image is-4by3">
            <img src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="Placeholder image" />
          </figure> */}
        </div>
        {/* <div className="card-header">
          <p className="card-header-title title">Vessel {index}</p>
        </div> */}
        <div className="card-content" style={{ paddingTop: '0.5rem' }}>
          <p className="is-6"><b>Name of Ship: </b>{registration.vessel.name}</p>
          <p className="is-6"><b>port: </b>{registration.port.name}</p>
          <p className="is-6"><b>imo: </b>{registration.vessel.imo}</p>
          <p className="is-6"><b>tonnage: </b>{registration.tonnage}</p>
          <p className="is-6"><b>propulsion: </b>{registration.propulsion.name}</p>
          <p className="is-6"><b>yard_number: </b>{registration.yard_number}</p>
          <p className="is-6"><b>vessel_length: </b>{registration.vessel_length}</p>
          <p className="is-6"><b>hulls: </b>{registration.hulls}</p>
          <p className="is-6"><b>purpose: </b>{registration.purpose}</p>
          <p className="is-6"><b>start_date: </b>{registration.start_date}</p>
          <p className="is-6"><b>expiration_date: </b>{registration.expiration_date}</p>
          <div className="is-6"><b>OWNERSHIP DETAILS: </b>
            {/* {registration.owner.map((owner, index) => ( */}
            <div key={index} className="pl-5">
              <p className="is-6"><b>Name: </b>{registration.owner.name}</p>
              <p className="is-6"><b>Email: </b>{registration.owner.email}</p>
              <p className="is-6"><b>Address: </b>{registration.owner.address}</p>
              <p className="is-6"><b>Account Type: </b>{registration.owner.account}</p>
            </div>
            {/* ))} */}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegistrationCard);
